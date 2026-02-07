/**
 * Fancy titles and emojis for Wind + Other job combinations.
 * Key format: "windJobId|otherJobId"
 */
export interface JobCombo {
  title: string
  emoji: string
}

export const JOB_COMBOS: Record<string, JobCombo> = {
  // Knight combos
  'knight|white-mage': { title: 'Paladin', emoji: '⚜️' },
  'knight|black-mage': { title: 'Dark Knight', emoji: '🌑' },
  'knight|monk': { title: 'Champion', emoji: '🏆' },
  'knight|red-mage': { title: 'Spellblade', emoji: '🪄' },
  'knight|mystic-knight': { title: 'Rune Knight', emoji: '📜' },
  'knight|samurai': { title: 'Blade Master', emoji: '⚔️' },
  'knight|dragoon': { title: 'Dragon Knight', emoji: '🐲' },
  'knight|summoner': { title: 'Knight Summoner', emoji: '🦅' },
  'knight|berserker': { title: 'Ravager', emoji: '😤' },
  'knight|ninja': { title: 'Shadow Knight', emoji: '🌑' },
  'knight|ranger': { title: 'Forest Knight', emoji: '🌲' },
  'knight|beastmaster': { title: 'Beast Knight', emoji: '🐺' },
  'knight|thief': { title: 'Rogue', emoji: '🎭' },
  'knight|blue-mage': { title: 'Rune Knight', emoji: '📜' },
  'knight|time-mage': { title: 'Temporal Knight', emoji: '⏰' },
  'knight|geomancer': { title: 'Terra Knight', emoji: '🗻' },
  'knight|bard': { title: 'War Bard', emoji: '🎺' },
  'knight|dancer': { title: 'Blade Dancer', emoji: '💃' },
  'knight|chemist': { title: 'Battle Medic', emoji: '🩹' },
  // Monk combos
  'monk|white-mage': { title: 'Martial Sage', emoji: '🧘' },
  'monk|black-mage': { title: 'Mystic', emoji: '📿' },
  'monk|ninja': { title: 'Martial Artist', emoji: '🥋' },
  'monk|chemist': { title: 'Alchemist', emoji: '⚗️' },
  'monk|berserker': { title: 'Brawler', emoji: '✊' },
  'monk|red-mage': { title: 'War Mage', emoji: '🪄' },
  'monk|summoner': { title: 'Summoning Monk', emoji: '🙏' },
  'monk|samurai': { title: 'Iron Fist', emoji: '✊' },
  'monk|dragoon': { title: 'Dragon Fist', emoji: '🐲' },
  'monk|thief': { title: 'Street Fighter', emoji: '🥊' },
  'monk|blue-mage': { title: 'Beast Sage', emoji: '🦎' },
  'monk|mystic-knight': { title: 'Spellfist', emoji: '💫' },
  'monk|time-mage': { title: 'Chrono Monk', emoji: '⏱️' },
  'monk|beastmaster': { title: 'Beast Fist', emoji: '🦁' },
  'monk|geomancer': { title: 'Earth Fist', emoji: '🪨' },
  'monk|ranger': { title: 'Hunt Master', emoji: '🎯' },
  'monk|bard': { title: 'Battle Dancer', emoji: '🥁' },
  'monk|dancer': { title: 'Martial Dancer', emoji: '🕺' },
  // Thief combos
  'thief|ninja': { title: 'Assassin', emoji: '🎭' },
  'thief|ranger': { title: 'Scout', emoji: '🔭' },
  'thief|dancer': { title: 'Trickster', emoji: '🃏' },
  'thief|bard': { title: 'Minstrel', emoji: '🎸' },
  'thief|white-mage': { title: 'Healing Hand', emoji: '✋' },
  'thief|black-mage': { title: 'Shadow Mage', emoji: '🌑' },
  'thief|blue-mage': { title: 'Spell Thief', emoji: '📜' },
  'thief|red-mage': { title: 'Crimson Rogue', emoji: '❤️' },
  'thief|time-mage': { title: 'Time Thief', emoji: '⏱️' },
  'thief|summoner': { title: 'Contract Thief', emoji: '📋' },
  'thief|berserker': { title: 'Cutthroat', emoji: '☠️' },
  'thief|mystic-knight': { title: 'Arcane Blade', emoji: '🪄' },
  'thief|beastmaster': { title: 'Beast Tamer', emoji: '🦜' },
  'thief|geomancer': { title: 'Nature Thief', emoji: '🍃' },
  'thief|dragoon': { title: 'Lance Thief', emoji: '🦅' },
  'thief|samurai': { title: 'Ronin', emoji: '🎌' },
  'thief|chemist': { title: 'Poisoner', emoji: '☠️' },
  // Black Mage combos
  'black-mage|white-mage': { title: 'Sage', emoji: '📖' },
  'black-mage|summoner': { title: 'Warlock', emoji: '👹' },
  'black-mage|red-mage': { title: 'Magus', emoji: '🪄' },
  'black-mage|blue-mage': { title: 'Arcanist', emoji: '📜' },
  'black-mage|geomancer': { title: 'Elementalist', emoji: '🌪️' },
  'black-mage|mystic-knight': { title: 'Dark Knight', emoji: '⚔️' },
  'black-mage|time-mage': { title: 'Chronomancer', emoji: '⏰' },
  'black-mage|monk': { title: 'Mystic', emoji: '📿' },
  'black-mage|knight': { title: 'Spellblade', emoji: '🪄' },
  'black-mage|thief': { title: 'Shadow Mage', emoji: '🌑' },
  'black-mage|berserker': { title: 'Berserker Mage', emoji: '😤' },
  'black-mage|beastmaster': { title: 'Beast Mage', emoji: '🦇' },
  'black-mage|ninja': { title: 'Shadow Caster', emoji: '🌙' },
  'black-mage|ranger': { title: 'Hunt Mage', emoji: '🎯' },
  'black-mage|bard': { title: 'Dark Bard', emoji: '🎻' },
  'black-mage|dragoon': { title: 'Dragon Mage', emoji: '🐲' },
  'black-mage|dancer': { title: 'Dark Dancer', emoji: '👤' },
  'black-mage|samurai': { title: 'Blade Mage', emoji: '🪄' },
  'black-mage|chemist': { title: 'Alchemist', emoji: '⚗️' },
  // White Mage combos
  'white-mage|summoner': { title: 'White Summoner', emoji: '🕊️' },
  'white-mage|chemist': { title: 'Medic', emoji: '🩺' },
  'white-mage|time-mage': { title: 'Oracle', emoji: '👁️' },
  'white-mage|geomancer': { title: 'Druid', emoji: '🌳' },
  'white-mage|red-mage': { title: 'Cleric', emoji: '✝️' },
  'white-mage|blue-mage': { title: 'Healing Sage', emoji: '💠' },
  'white-mage|knight': { title: 'Paladin', emoji: '⚜️' },
  'white-mage|monk': { title: 'Martial Sage', emoji: '🧘' },
  'white-mage|thief': { title: 'Healing Hand', emoji: '✋' },
  'white-mage|black-mage': { title: 'Sage', emoji: '📖' },
  'white-mage|berserker': { title: 'Battle Priest', emoji: '⛪' },
  'white-mage|mystic-knight': { title: 'Holy Knight', emoji: '✝️' },
  'white-mage|beastmaster': { title: 'Beast Healer', emoji: '🦌' },
  'white-mage|ninja': { title: 'Shadow Healer', emoji: '🌙' },
  'white-mage|ranger': { title: 'Forest Healer', emoji: '🌲' },
  'white-mage|bard': { title: 'Healing Bard', emoji: '🎸' },
  'white-mage|dragoon': { title: 'Holy Lancer', emoji: '♰' },
  'white-mage|dancer': { title: 'Sacred Dancer', emoji: '💃' },
  'white-mage|samurai': { title: 'Spirit Blade', emoji: '🗡️' },
  // Blue Mage combos
  'blue-mage|black-mage': { title: 'Arcanist', emoji: '📜' },
  'blue-mage|red-mage': { title: 'Spellblade', emoji: '🪄' },
  'blue-mage|summoner': { title: 'Eidolon', emoji: '👻' },
  'blue-mage|monk': { title: 'Beast Sage', emoji: '🦎' },
  'blue-mage|knight': { title: 'Rune Knight', emoji: '📜' },
  'blue-mage|thief': { title: 'Spell Thief', emoji: '📖' },
  'blue-mage|white-mage': { title: 'Healing Sage', emoji: '💠' },
  'blue-mage|time-mage': { title: 'Chrono Mage', emoji: '⏰' },
  'blue-mage|berserker': { title: 'Beast Rage', emoji: '😤' },
  'blue-mage|mystic-knight': { title: 'Rune Blade', emoji: '🪄' },
  'blue-mage|beastmaster': { title: 'Beast Lord', emoji: '🦁' },
  'blue-mage|geomancer': { title: 'Nature Mage', emoji: '🌳' },
  'blue-mage|ninja': { title: 'Shadow Beast', emoji: '🐺' },
  'blue-mage|ranger': { title: 'Hunt Mage', emoji: '🎯' },
  'blue-mage|bard': { title: 'Song Mage', emoji: '🎤' },
  'blue-mage|dragoon': { title: 'Dragon Mage', emoji: '🐲' },
  'blue-mage|dancer': { title: 'Beast Dancer', emoji: '🦚' },
  'blue-mage|samurai': { title: 'Rune Blade', emoji: '📜' },
  'blue-mage|chemist': { title: 'Alchemist', emoji: '⚗️' },
}

export function getJobCombo(windJobId: string, otherJobId: string): JobCombo | null {
  const key1 = `${windJobId}|${otherJobId}`
  const key2 = `${otherJobId}|${windJobId}`
  return JOB_COMBOS[key1] ?? JOB_COMBOS[key2] ?? null
}

export function getJobComboTitle(windJobId: string, otherJobId: string): string | null {
  return getJobCombo(windJobId, otherJobId)?.title ?? null
}
