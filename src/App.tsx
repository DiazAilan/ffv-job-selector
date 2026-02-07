import { useState, useEffect } from 'react'
import './App.scss'
import {
  WIND_JOBS,
  ALL_JOBS,
  findJobById,
} from './data/jobs'
import { getJobCombo } from './data/jobCombos'
import { getMasteryStats } from './data/jobStats'
import { getCombinedPassives } from './data/jobPassives'
import { mixHexColors } from './utils/color'
import {
  type SavedSelections,
  type SaveSlot,
  type CharacterId,
  CHARACTER_IDS,
  CHARACTER_NAMES,
} from './types'

const STORAGE_KEY = 'ffv-job-selections'
const SLOTS_KEY = 'ffv-job-slots'

const emptySelection = () => ({
  windJob: null,
  otherJob: null,
})

const initialSelections: SavedSelections = {
  bartz: emptySelection(),
  lenna: emptySelection(),
  galufKrile: emptySelection(),
  faris: emptySelection(),
}

function createEmptySlot(index: number): SaveSlot {
  return {
    name: `Slot ${index + 1}`,
    selections: JSON.parse(JSON.stringify(initialSelections)),
  }
}

const DEFAULT_SLOTS: SaveSlot[] = [
  createEmptySlot(0),
  createEmptySlot(1),
  createEmptySlot(2),
  createEmptySlot(3),
  createEmptySlot(4),
]

function loadSlotsFromStorage(): { slots: SaveSlot[]; activeSlotIndex: number } {
  try {
    const stored = localStorage.getItem(SLOTS_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as { slots: SaveSlot[]; activeSlotIndex: number }
      if (parsed.slots?.length >= 5) {
        return {
          slots: parsed.slots.map((s, i) => ({
            name: s.name || `Slot ${i + 1}`,
            selections: { ...initialSelections, ...s.selections },
          })),
          activeSlotIndex: Math.min(parsed.activeSlotIndex ?? 0, 4),
        }
      }
    }
    // Migrate from old single-slot format
    const oldStored = localStorage.getItem(STORAGE_KEY)
    if (oldStored) {
      const parsed = JSON.parse(oldStored) as SavedSelections
      const migrated: SaveSlot[] = [
        { name: 'Slot 1', selections: { ...initialSelections, ...parsed } },
        ...DEFAULT_SLOTS.slice(1),
      ]
      return { slots: migrated, activeSlotIndex: 0 }
    }
  } catch {
    // ignore
  }
  return { slots: JSON.parse(JSON.stringify(DEFAULT_SLOTS)), activeSlotIndex: 0 }
}

function saveSlotsToStorage(slots: SaveSlot[], activeSlotIndex: number) {
  try {
    localStorage.setItem(SLOTS_KEY, JSON.stringify({ slots, activeSlotIndex }))
  } catch {
    // ignore
  }
}

function getUsedJobIds(selections: SavedSelections): Set<string> {
  const used = new Set<string>()
  for (const charId of CHARACTER_IDS) {
    const s = selections[charId]
    if (s.windJob) used.add(s.windJob)
    if (s.otherJob) used.add(s.otherJob)
  }
  return used
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

const NUM_SLOTS = 5

function App() {
  const [state, setState] = useState(() => {
    const loaded = loadSlotsFromStorage()
    return {
      slots: loaded.slots,
      activeSlotIndex: loaded.activeSlotIndex,
      statsAndPassivesOpen: new Set<CharacterId>(),
    }
  })

  const { slots, activeSlotIndex, statsAndPassivesOpen } = state

  const toggleStatsAndPassives = (charId: CharacterId) => {
    setState((prev) => {
      const next = new Set(prev.statsAndPassivesOpen)
      if (next.has(charId)) next.delete(charId)
      else next.add(charId)
      return { ...prev, statsAndPassivesOpen: next }
    })
  }
  const selections = slots[activeSlotIndex]?.selections ?? initialSelections

  useEffect(() => {
    saveSlotsToStorage(slots, activeSlotIndex)
  }, [slots, activeSlotIndex])

  const updateActiveSlotSelections = (updater: (prev: SavedSelections) => SavedSelections) => {
    setState((prev) => {
      const newSlots = [...prev.slots]
      newSlots[prev.activeSlotIndex] = {
        ...newSlots[prev.activeSlotIndex],
        selections: updater(newSlots[prev.activeSlotIndex].selections),
      }
      return { ...prev, slots: newSlots }
    })
  }

  const switchSlot = (index: number) => {
    setState((prev) => ({ ...prev, activeSlotIndex: index }))
  }

  // Clear invalid state: otherJob cannot equal windJob; remove jobs that no longer exist (e.g. Mime)
  useEffect(() => {
    let hasInvalid = false
    const fixed = { ...selections }
    for (const charId of CHARACTER_IDS) {
      const s = fixed[charId]
      let wind = s.windJob
      let other = s.otherJob
      if (wind && !findJobById(wind)) wind = null
      if (other && !findJobById(other)) other = null
      if (wind && other && wind === other) other = null
      if (wind !== s.windJob || other !== s.otherJob) {
        fixed[charId] = { windJob: wind, otherJob: other }
        hasInvalid = true
      }
    }
    if (hasInvalid) updateActiveSlotSelections(() => fixed)
  }, [selections])

  const usedJobIds = getUsedJobIds(selections)

  const setJob = (charId: CharacterId, slot: 'windJob' | 'otherJob', jobId: string | null) => {
    updateActiveSlotSelections((prev) => ({
      ...prev,
      [charId]: {
        ...prev[charId],
        [slot]: jobId,
      },
    }))
  }

  const getJobOptions = (slot: 'windJob' | 'otherJob', excludeCharId?: CharacterId) => {
    const used = new Set(usedJobIds)
    if (excludeCharId) {
      const s = selections[excludeCharId]
      if (slot === 'windJob') {
        if (s.windJob) used.delete(s.windJob)
        if (s.otherJob) used.delete(s.otherJob)
      } else {
        // For otherJob: only exclude otherJob so user can change it.
        // Keep windJob in used so the same job can't be picked twice for one character.
        if (s.otherJob) used.delete(s.otherJob)
      }
    }
    if (slot === 'windJob') {
      return WIND_JOBS.filter((j) => !used.has(j.id))
    }
    return ALL_JOBS.filter((j) => !used.has(j.id))
  }

  const clearAll = () => updateActiveSlotSelections(() => JSON.parse(JSON.stringify(initialSelections)))

  const handleRandomAll = () => {
    const windShuffled = shuffle(WIND_JOBS)
    const windPicks = windShuffled.slice(0, 4)
    const usedIds = new Set(windPicks.map((j) => j.id))
    const otherPool = ALL_JOBS.filter((j) => !usedIds.has(j.id))
    const otherShuffled = shuffle(otherPool)
    const otherPicks = otherShuffled.slice(0, 4)
    updateActiveSlotSelections(() => ({
      bartz: { windJob: windPicks[0].id, otherJob: otherPicks[0].id },
      lenna: { windJob: windPicks[1].id, otherJob: otherPicks[1].id },
      galufKrile: { windJob: windPicks[2].id, otherJob: otherPicks[2].id },
      faris: { windJob: windPicks[3].id, otherJob: otherPicks[3].id },
    }))
  }

  const clearCharacter = (charId: CharacterId) => {
    updateActiveSlotSelections((prev) => ({
      ...prev,
      [charId]: emptySelection(),
    }))
  }

  const pickedJobs = CHARACTER_IDS.flatMap((charId) => {
    const s = selections[charId]
    const jobs = []
    if (s.windJob) {
      const j = findJobById(s.windJob)
      if (j) jobs.push(j)
    }
    if (s.otherJob) {
      const j = findJobById(s.otherJob)
      if (j) jobs.push(j)
    }
    return jobs
  })

  return (
    <div className="app">
      <header className="app-header">
        <h1>FFV Class Selector</h1>
        <p className="subtitle">
          Pick 2 jobs per character (1 Wind + 1 other). No repeats.
        </p>
        <div className="header-buttons">
          <button type="button" onClick={handleRandomAll} className="random-all-btn">
            Random All
          </button>
          <button type="button" onClick={clearAll} className="clear-btn">
            Clear All
          </button>
        </div>
      </header>

      <section className="save-slots">
        {Array.from({ length: NUM_SLOTS }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => switchSlot(i)}
            className={`slot-btn ${i === activeSlotIndex ? 'active' : ''}`}
            title={slots[i]?.name}
          >
            {slots[i]?.name ?? `Slot ${i + 1}`}
          </button>
        ))}
      </section>

      <main className="characters-grid">
        {CHARACTER_IDS.map((charId) => {
          const s = selections[charId]
          const windOptions = getJobOptions('windJob', charId)
          const otherOptions = getJobOptions('otherJob', charId)
          const windJob = s.windJob ? findJobById(s.windJob) : null
          const otherJob = s.otherJob ? findJobById(s.otherJob) : null
          const combo = s.windJob && s.otherJob ? getJobCombo(s.windJob, s.otherJob) : null

          const showStatsAndPassives = statsAndPassivesOpen.has(charId)
          const canToggleStats = !!combo && !!windJob && !!otherJob

          return (
            <section key={charId} className="character-card">
              <div className="character-header">
                <h2>{CHARACTER_NAMES[charId]}</h2>
                <div className="header-actions">
                  {canToggleStats && (
                    <button
                      type="button"
                      onClick={() => toggleStatsAndPassives(charId)}
                      className="toggle-stats-btn"
                      title={showStatsAndPassives ? 'Back to jobs' : 'Info'}
                    >
                      {showStatsAndPassives ? 'Jobs' : 'Info'}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => clearCharacter(charId)}
                    className="clear-char-btn"
                    title={`Clear ${CHARACTER_NAMES[charId]}`}
                  >
                    Clear
                  </button>
                </div>
              </div>
              {showStatsAndPassives && canToggleStats ? (
                <div className="stats-passives-view">
                  <p
                    className="combo-title"
                    style={{
                      color: mixHexColors(windJob!.color, otherJob!.color),
                    }}
                  >
                    {combo!.emoji} {combo!.title}
                  </p>
                  <div className="mastery-stats">
                    <span className="mastery-label">Mastery bonus</span>
                    {Object.entries(getMasteryStats(windJob!.id, otherJob!.id)).map(
                      ([stat, val]) => (
                        <span key={stat} className="stat">
                          {stat.toUpperCase()} {val >= 0 ? '+' : ''}{val}
                        </span>
                      )
                    )}
                  </div>
                  {(() => {
                    const passives = getCombinedPassives(windJob!.id, otherJob!.id)
                    if (passives.length === 0) return null
                    return (
                      <div className="passives-section">
                        <span className="passives-label">Passives</span>
                        <ul className="passives-list">
                          {passives.map((p) => (
                            <li
                              key={p.id}
                              className="passive-item"
                              data-tooltip={p.description}
                            >
                              {p.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })()}
                </div>
              ) : (
                <>
                  {combo && windJob && otherJob && (
                    <p
                      className="combo-title"
                      style={{
                        color: mixHexColors(windJob.color, otherJob.color),
                      }}
                    >
                      {combo.emoji} {combo.title}
                    </p>
                  )}
                  <div className="slots">
                <div className="slot">
                  <label>Wind (required)</label>
                  <select
                    value={s.windJob ?? ''}
                    onChange={(e) =>
                      setJob(charId, 'windJob', e.target.value || null)
                    }
                  >
                    <option value="">— Select —</option>
                    {windOptions.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.emoji} {j.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="slot">
                  <label>Other</label>
                  <select
                    value={s.otherJob ?? ''}
                    onChange={(e) =>
                      setJob(charId, 'otherJob', e.target.value || null)
                    }
                  >
                    <option value="">— Select —</option>
                    {otherOptions.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.emoji} {j.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="random-buttons">
                <button
                  type="button"
                  onClick={() => {
                    if (windOptions.length > 0) {
                      setJob(charId, 'windJob', pickRandom(windOptions).id)
                    }
                  }}
                  title="Pick a random unused Wind job"
                >
                  Random Wind
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (otherOptions.length > 0) {
                      setJob(charId, 'otherJob', pickRandom(otherOptions).id)
                    }
                  }}
                  title="Pick a random unused job"
                >
                  Random Job
                </button>
              </div>
              {(windJob || otherJob) && (
                <div className="selected-summary">
                  {windJob && (
                    <span
                      className="job-tag"
                      style={{
                        background: `${windJob.color}33`,
                        color: windJob.color,
                      }}
                    >
                      {windJob.emoji} {windJob.name}
                    </span>
                  )}
                  {otherJob && (
                    <span
                      className="job-tag"
                      style={{
                        background: `${otherJob.color}33`,
                        color: otherJob.color,
                      }}
                    >
                      {otherJob.emoji} {otherJob.name}
                    </span>
                  )}
                </div>
              )}
                </>
              )}
            </section>
          )
        })}
      </main>

      {pickedJobs.length > 0 && (
        <section className="picked-jobs">
          <h3>Picked jobs</h3>
          <ul>
            {pickedJobs.map((j) => (
              <li
                key={j.id}
                className="job-tag"
                style={{
                  background: `${j.color}33`,
                  color: j.color,
                }}
              >
                {j.emoji} {j.name}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default App
