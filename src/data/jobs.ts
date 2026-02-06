export type Crystal = 'wind' | 'water' | 'fire' | 'earth' | 'advance'

export interface Job {
  id: string
  name: string
  crystal: Crystal
}

export const WIND_JOBS: Job[] = [
  { id: 'knight', name: 'Knight', crystal: 'wind' },
  { id: 'monk', name: 'Monk', crystal: 'wind' },
  { id: 'thief', name: 'Thief', crystal: 'wind' },
  { id: 'black-mage', name: 'Black Mage', crystal: 'wind' },
  { id: 'white-mage', name: 'White Mage', crystal: 'wind' },
  { id: 'blue-mage', name: 'Blue Mage', crystal: 'wind' },
]

export const NON_WIND_JOBS: Job[] = [
  { id: 'red-mage', name: 'Red Mage', crystal: 'water' },
  { id: 'time-mage', name: 'Time Mage', crystal: 'water' },
  { id: 'summoner', name: 'Summoner', crystal: 'water' },
  { id: 'berserker', name: 'Berserker', crystal: 'water' },
  { id: 'mystic-knight', name: 'Mystic Knight', crystal: 'water' },
  { id: 'mime', name: 'Mime', crystal: 'water' },
  { id: 'beastmaster', name: 'Beastmaster', crystal: 'fire' },
  { id: 'geomancer', name: 'Geomancer', crystal: 'fire' },
  { id: 'ninja', name: 'Ninja', crystal: 'fire' },
  { id: 'ranger', name: 'Ranger', crystal: 'fire' },
  { id: 'bard', name: 'Bard', crystal: 'fire' },
  { id: 'dragoon', name: 'Dragoon', crystal: 'earth' },
  { id: 'dancer', name: 'Dancer', crystal: 'earth' },
  { id: 'samurai', name: 'Samurai', crystal: 'earth' },
  { id: 'chemist', name: 'Chemist', crystal: 'earth' },
  { id: 'necromancer', name: 'Necromancer', crystal: 'advance' },
  { id: 'cannoneer', name: 'Cannoneer', crystal: 'advance' },
  { id: 'gladiator', name: 'Gladiator', crystal: 'advance' },
  { id: 'oracle', name: 'Oracle', crystal: 'advance' },
]

export const ALL_JOBS: Job[] = [...WIND_JOBS, ...NON_WIND_JOBS]

export function findJobById(id: string): Job | undefined {
  return ALL_JOBS.find((j) => j.id === id)
}
