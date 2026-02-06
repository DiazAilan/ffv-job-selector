import { useState, useEffect } from 'react'
import './App.scss'
import {
  WIND_JOBS,
  ALL_JOBS,
  findJobById,
} from './data/jobs'
import {
  type SavedSelections,
  type CharacterId,
  CHARACTER_IDS,
  CHARACTER_NAMES,
} from './types'

const STORAGE_KEY = 'ffv-job-selections'

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

function loadFromStorage(): SavedSelections {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as SavedSelections
      return { ...initialSelections, ...parsed }
    }
  } catch {
    // ignore
  }
  return initialSelections
}

function saveToStorage(selections: SavedSelections) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selections))
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

function App() {
  const [selections, setSelections] = useState<SavedSelections>(loadFromStorage)

  useEffect(() => {
    saveToStorage(selections)
  }, [selections])

  // Clear invalid state: otherJob cannot equal windJob for the same character
  useEffect(() => {
    let hasInvalid = false
    const fixed = { ...selections }
    for (const charId of CHARACTER_IDS) {
      const s = fixed[charId]
      if (s.windJob && s.otherJob && s.windJob === s.otherJob) {
        fixed[charId] = { ...s, otherJob: null }
        hasInvalid = true
      }
    }
    if (hasInvalid) setSelections(fixed)
  }, [selections])

  const usedJobIds = getUsedJobIds(selections)

  const setJob = (charId: CharacterId, slot: 'windJob' | 'otherJob', jobId: string | null) => {
    setSelections((prev) => ({
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

  const clearAll = () => setSelections(initialSelections)

  const clearCharacter = (charId: CharacterId) => {
    setSelections((prev) => ({
      ...prev,
      [charId]: emptySelection(),
    }))
  }

  const pickedJobs = CHARACTER_IDS.flatMap((charId) => {
    const s = selections[charId]
    const jobs: { id: string; name: string }[] = []
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
        <button type="button" onClick={clearAll} className="clear-btn">
          Clear All
        </button>
      </header>

      <main className="characters-grid">
        {CHARACTER_IDS.map((charId) => {
          const s = selections[charId]
          const windOptions = getJobOptions('windJob', charId)
          const otherOptions = getJobOptions('otherJob', charId)
          const windJob = s.windJob ? findJobById(s.windJob) : null
          const otherJob = s.otherJob ? findJobById(s.otherJob) : null

          return (
            <section key={charId} className="character-card">
              <div className="character-header">
                <h2>{CHARACTER_NAMES[charId]}</h2>
                <button
                  type="button"
                  onClick={() => clearCharacter(charId)}
                  className="clear-char-btn"
                  title={`Clear ${CHARACTER_NAMES[charId]}`}
                >
                  Clear
                </button>
              </div>
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
                        {j.name}
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
                        {j.name}
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
                  {windJob && <span className="job-tag wind">{windJob.name}</span>}
                  {otherJob && (
                    <span className="job-tag other">{otherJob.name}</span>
                  )}
                </div>
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
              <li key={j.id}>{j.name}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default App
