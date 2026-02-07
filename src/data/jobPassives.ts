/**
 * Innate support abilities (passives) per job.
 * Excludes: equip abilities (Equip Swords, Equip Rods, etc.) and Berserk.
 * Source: https://finalfantasy.fandom.com/wiki/Final_Fantasy_V_support_abilities
 */
export interface Passive {
  id: string
  name: string
  description: string
}

export const JOB_PASSIVES: Record<string, Passive[]> = {
  knight: [
    { id: 'cover', name: 'Cover', description: 'Take hits for allies who are low on HP.' },
  ],
  monk: [
    { id: 'barehanded', name: 'Barehanded', description: 'Gain the same attack power as monks when unarmed.' },
    { id: 'counter', name: 'Counter', description: 'Automatically counter when hit physically.' },
  ],
  thief: [
    { id: 'find-passages', name: 'Find Passages', description: 'Detect hidden passageways.' },
    { id: 'sprint', name: 'Sprint', description: 'Party runs faster on the world map.' },
    { id: 'vigilance', name: 'Vigilance', description: 'Prevent back attacks.' },
    { id: 'artful-dodger', name: 'Artful Dodger', description: 'Gain the same speed and agility as a thief.' },
  ],
  'black-mage': [],
  'white-mage': [],
  'blue-mage': [
    { id: 'learning', name: 'Learning', description: 'Learn Blue Magic from monsters when hit by their attacks.' },
  ],
  'red-mage': [],
  'time-mage': [],
  summoner: [],
  berserker: [],
  'mystic-knight': [
    { id: 'magic-shell', name: 'Magic Shell', description: 'Automatically cast Shell when near KO.' },
  ],
  beastmaster: [],
  geomancer: [
    { id: 'find-pits', name: 'Find Pits', description: 'Detect holes in the floor.' },
    { id: 'light-step', name: 'Light Step', description: 'Avoid damage on floors with harmful effects.' },
  ],
  ninja: [
    { id: 'first-strike', name: 'First Strike', description: 'Increase the chances of having the first attack.' },
    { id: 'dual-wield', name: 'Dual-Wield', description: 'Carry and attack with a weapon in each hand. Bows and harps cannot be dual-wielded.' },
  ],
  ranger: [],
  bard: [],
  dragoon: [],
  dancer: [],
  samurai: [
    { id: 'shirahadori', name: 'Shirahadori', description: 'Catch and stop enemy physical attacks.' },
  ],
  chemist: [
    { id: 'pharmacology', name: 'Pharmacology', description: 'Double the potency of potions and ethers.' },
  ],
}

/**
 * Get combined passives from both jobs (deduplicated by id).
 */
export function getCombinedPassives(jobId1: string, jobId2: string): Passive[] {
  const p1 = JOB_PASSIVES[jobId1] ?? []
  const p2 = JOB_PASSIVES[jobId2] ?? []
  const seen = new Set<string>()
  const combined: Passive[] = []
  for (const p of [...p1, ...p2]) {
    if (!seen.has(p.id)) {
      seen.add(p.id)
      combined.push(p)
    }
  }
  return combined.sort((a, b) => a.name.localeCompare(b.name))
}
