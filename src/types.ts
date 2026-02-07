export interface CharacterSelection {
  windJob: string | null
  otherJob: string | null
}

export interface SavedSelections {
  bartz: CharacterSelection
  lenna: CharacterSelection
  galufKrile: CharacterSelection
  faris: CharacterSelection
}

export interface SaveSlot {
  name: string
  selections: SavedSelections
}

export const CHARACTER_IDS = ['bartz', 'lenna', 'galufKrile', 'faris'] as const
export type CharacterId = (typeof CHARACTER_IDS)[number]

export const CHARACTER_NAMES: Record<CharacterId, string> = {
  bartz: '🐔 Bartz',
  lenna: '👸 Lenna',
  galufKrile: '🧔 Galuf',
  faris: '🏴‍☠️ Faris',
}
