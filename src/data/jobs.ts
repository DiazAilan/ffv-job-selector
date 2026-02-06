export type Crystal = 'wind' | 'water' | 'fire' | 'earth'

export interface Job {
  id: string
  name: string
  crystal: Crystal
  emoji: string
  color: string
}

export const WIND_JOBS: Job[] = [
  { id: 'knight', name: 'Knight', crystal: 'wind', emoji: '🛡️', color: '#6b8cce' },
  { id: 'monk', name: 'Monk', crystal: 'wind', emoji: '👊', color: '#e89b4a' },
  { id: 'thief', name: 'Thief', crystal: 'wind', emoji: '🔪', color: '#9b6bcc' },
  { id: 'black-mage', name: 'Black Mage', crystal: 'wind', emoji: '🔮', color: '#5a3d7a' },
  { id: 'white-mage', name: 'White Mage', crystal: 'wind', emoji: '✨', color: '#e8e8e8' },
  { id: 'blue-mage', name: 'Blue Mage', crystal: 'wind', emoji: '🐙', color: '#4a7bc8' },
]

export const NON_WIND_JOBS: Job[] = [
  { id: 'red-mage', name: 'Red Mage', crystal: 'water', emoji: '🔴', color: '#c84a4a' },
  { id: 'time-mage', name: 'Time Mage', crystal: 'water', emoji: '⏳', color: '#4ab8c8' },
  { id: 'summoner', name: 'Summoner', crystal: 'water', emoji: '🐉', color: '#8b5c3c' },
  { id: 'berserker', name: 'Berserker', crystal: 'water', emoji: '🪓', color: '#8b2c2c' },
  { id: 'mystic-knight', name: 'Mystic Knight', crystal: 'water', emoji: '⚔️', color: '#7a6bc8' },
  { id: 'beastmaster', name: 'Beastmaster', crystal: 'fire', emoji: '🐾', color: '#c87a4a' },
  { id: 'geomancer', name: 'Geomancer', crystal: 'fire', emoji: '🌿', color: '#4a8b4a' },
  { id: 'ninja', name: 'Ninja', crystal: 'fire', emoji: '🥷', color: '#4a4a4a' },
  { id: 'ranger', name: 'Ranger', crystal: 'fire', emoji: '🏹', color: '#8b6b3a' },
  { id: 'bard', name: 'Bard', crystal: 'fire', emoji: '🎵', color: '#c8a84a' },
  { id: 'dragoon', name: 'Dragoon', crystal: 'earth', emoji: '🔱', color: '#5a8b5a' },
  { id: 'dancer', name: 'Dancer', crystal: 'earth', emoji: '🩰', color: '#c85a8b' },
  { id: 'samurai', name: 'Samurai', crystal: 'earth', emoji: '🗡️', color: '#7a7a7a' },
  { id: 'chemist', name: 'Chemist', crystal: 'earth', emoji: '🧪', color: '#4ac85a' },
]

export const ALL_JOBS: Job[] = [...WIND_JOBS, ...NON_WIND_JOBS]

export function findJobById(id: string): Job | undefined {
  return ALL_JOBS.find((j) => j.id === id)
}
