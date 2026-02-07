/**
 * Stat modifiers when a job is mastered (transfer to Freelancer/Mime).
 * Per FFV wiki: only the strongest modifier applies per stat when mastering multiple jobs.
 * Source: https://finalfantasy.fandom.com/wiki/Final_Fantasy_V_jobs
 */
export interface JobStats {
  str: number
  agi: number
  sta: number
  mag: number
}

export const JOB_STATS: Record<string, JobStats> = {
  knight: { str: 23, agi: 1, sta: 20, mag: -14 },
  monk: { str: 26, agi: 1, sta: 26, mag: -23 },
  thief: { str: 1, agi: 16, sta: 2, mag: -6 },
  'black-mage': { str: -9, agi: 0, sta: -2, mag: 31 },
  'white-mage': { str: -7, agi: 1, sta: 0, mag: 25 },
  'blue-mage': { str: -8, agi: 1, sta: 3, mag: 23 },
  'red-mage': { str: 8, agi: 5, sta: -6, mag: 8 },
  'time-mage': { str: -5, agi: 2, sta: -3, mag: 24 },
  summoner: { str: -10, agi: -1, sta: -1, mag: 33 },
  berserker: { str: 21, agi: -9, sta: 25, mag: -23 },
  'mystic-knight': { str: 14, agi: 14, sta: 14, mag: 1 },
  beastmaster: { str: 13, agi: 1, sta: 8, mag: -3 },
  geomancer: { str: 4, agi: 2, sta: 4, mag: 24 },
  ninja: { str: 15, agi: 14, sta: 3, mag: -10 },
  ranger: { str: 16, agi: 12, sta: 1, mag: -5 },
  bard: { str: -8, agi: 8, sta: -9, mag: 11 },
  dragoon: { str: 18, agi: 5, sta: 15, mag: -12 },
  dancer: { str: 5, agi: 5, sta: -10, mag: -5 },
  samurai: { str: 19, agi: 2, sta: 19, mag: -12 },
  chemist: { str: 2, agi: 3, sta: 6, mag: -4 },
}

/**
 * Get combined mastery stats when both jobs are mastered.
 * Per FFV: only the strongest modifier applies per stat (best of the two).
 */
export function getMasteryStats(jobId1: string, jobId2: string): JobStats {
  const s1 = JOB_STATS[jobId1] ?? { str: 0, agi: 0, sta: 0, mag: 0 }
  const s2 = JOB_STATS[jobId2] ?? { str: 0, agi: 0, sta: 0, mag: 0 }
  return {
    str: Math.max(s1.str, s2.str),
    agi: Math.max(s1.agi, s2.agi),
    sta: Math.max(s1.sta, s2.sta),
    mag: Math.max(s1.mag, s2.mag),
  }
}
