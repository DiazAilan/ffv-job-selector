/**
 * Slot abilities per job = all abilities EXCEPT passives AND EXCEPT equip abilities.
 * Includes: support abilities (Berserk, HP+%, Two-Handed, Dual-Wield, etc.) + command abilities.
 * Excludes: passives (innate), equip abilities (Equip Swords, Equip Rods, etc.)
 * Source: https://finalfantasy.fandom.com/wiki/Final_Fantasy_V_support_abilities
 *         https://finalfantasy.fandom.com/wiki/Final_Fantasy_V_command_abilities
 */
import { JOB_PASSIVES } from './jobPassives'

export interface SlotAbility {
  id: string
  name: string
  description: string
}

/** Equip abilities (excluded from slot abilities). */
const EQUIP_ABILITY_IDS = new Set([
  'equip-shield',
  'equip-armor',
  'equip-swords',
  'equip-axes',
  'equip-bows',
  'equip-harps',
  'equip-katanas',
  'equip-ribbons',
  'equip-rods',
  'equip-whips',
  'equip-lances',
])

/** All support abilities per job (including passives and equip). */
const JOB_ALL_SUPPORT: Record<string, SlotAbility[]> = {
  knight: [
    { id: 'cover', name: 'Cover', description: 'Take hits for allies who are low on HP.' },
    { id: 'two-handed', name: 'Two-Handed', description: 'Use both hands when wielding swords, katanas, or axes to inflict twice the damage.' },
    { id: 'equip-shield', name: 'Equip Shield', description: 'Gain the ability to wield shields.' },
    { id: 'equip-armor', name: 'Equip Armor', description: 'Gain the ability to wield light and heavy armor.' },
    { id: 'equip-swords', name: 'Equip Swords', description: 'Gain the ability to wield swords and knight swords.' },
  ],
  monk: [
    { id: 'barehanded', name: 'Barehanded', description: 'Gain the same attack power as monks when unarmed.' },
    { id: 'counter', name: 'Counter', description: 'Automatically counter when hit physically.' },
    { id: 'hp-10', name: 'HP +10%', description: 'Increase maximum HP by 10%.' },
    { id: 'hp-20', name: 'HP +20%', description: 'Increase maximum HP by 20%.' },
    { id: 'hp-30', name: 'HP +30%', description: 'Increase maximum HP by 30%.' },
  ],
  thief: [
    { id: 'find-passages', name: 'Find Passages', description: 'Detect hidden passageways.' },
    { id: 'sprint', name: 'Sprint', description: 'Party runs faster on the world map.' },
    { id: 'vigilance', name: 'Vigilance', description: 'Prevent back attacks.' },
    { id: 'artful-dodger', name: 'Artful Dodger', description: 'Gain the same speed and agility as a thief.' },
  ],
  'black-mage': [
    { id: 'mp-30', name: 'MP +30%', description: 'Increase maximum MP by 30%.' },
  ],
  'white-mage': [
    { id: 'mp-10', name: 'MP +10%', description: 'Increase maximum MP by 10%.' },
  ],
  'blue-mage': [
    { id: 'learning', name: 'Learning', description: 'Learn Blue Magic from monsters when hit by their attacks.' },
  ],
  'red-mage': [],
  'time-mage': [
    { id: 'equip-rods', name: 'Equip Rods', description: 'Gain the ability to wield rods and staves.' },
  ],
  summoner: [],
  berserker: [
    { id: 'berserk', name: 'Berserk', description: 'Always in berserk status; continuously attack until all enemies are defeated.' },
    { id: 'equip-axes', name: 'Equip Axes', description: 'Gain the ability to wield axes and hammers.' },
  ],
  'mystic-knight': [
    { id: 'magic-shell', name: 'Magic Shell', description: 'Automatically cast Shell when near KO.' },
  ],
  beastmaster: [
    { id: 'equip-whips', name: 'Equip Whips', description: 'Gain the ability to wield whips.' },
  ],
  geomancer: [
    { id: 'find-pits', name: 'Find Pits', description: 'Detect holes in the floor.' },
    { id: 'light-step', name: 'Light Step', description: 'Avoid damage on floors with harmful effects.' },
  ],
  ninja: [
    { id: 'first-strike', name: 'First Strike', description: 'Increase the chances of having the first attack.' },
    { id: 'dual-wield', name: 'Dual-Wield', description: 'Carry and attack with a weapon in each hand. Bows and harps cannot be dual-wielded.' },
  ],
  ranger: [
    { id: 'equip-bows', name: 'Equip Bows', description: 'Gain the ability to wield bows.' },
  ],
  bard: [
    { id: 'equip-harps', name: 'Equip Harps', description: 'Gain the ability to wield harps.' },
  ],
  dragoon: [
    { id: 'equip-lances', name: 'Equip Lances', description: 'Gain the ability to wield spears.' },
  ],
  dancer: [
    { id: 'equip-ribbons', name: 'Equip Ribbons', description: 'Gain the ability to wield ribbons and dancer-exclusive equipment.' },
  ],
  samurai: [
    { id: 'shirahadori', name: 'Shirahadori', description: 'Catch and stop enemy physical attacks.' },
    { id: 'equip-katanas', name: 'Equip Katanas', description: 'Gain the ability to wield katanas.' },
  ],
  chemist: [
    { id: 'pharmacology', name: 'Pharmacology', description: 'Double the potency of potions and ethers.' },
  ],
}

/** Command abilities per job (learnable, can be equipped). Kick is Monk-exclusive and not included. */
const JOB_COMMAND_ABILITIES: Record<string, SlotAbility[]> = {
  knight: [
    { id: 'guard', name: 'Guard', description: 'Negates damage from physical attacks.' },
  ],
  monk: [
    { id: 'focus', name: 'Focus', description: 'Focus energy to deliver a physical attack with 2x strength.' },
    { id: 'chakra', name: 'Chakra', description: 'Heals HP and cures darkness and poison.' },
  ],
  thief: [
    { id: 'flee', name: 'Flee', description: 'Run away to quickly escape from battle.' },
    { id: 'steal', name: 'Steal', description: 'Steals an item from an enemy.' },
    { id: 'mug', name: 'Mug', description: 'Steals an item from an enemy and inflicts damage.' },
  ],
  'black-mage': [
    { id: 'black-magic', name: 'Black Magic', description: 'Cast Black Magic spells.' },
  ],
  'white-mage': [
    { id: 'white-magic', name: 'White Magic', description: 'Cast White Magic spells.' },
  ],
  'blue-mage': [
    { id: 'check', name: 'Check', description: 'Check an enemy\'s HP.' },
    { id: 'blue-magic', name: 'Blue Magic', description: 'Cast Blue Magic spells.' },
    { id: 'scan', name: 'Scan', description: 'Check enemy\'s HP, level, weaknesses, and status ailments.' },
  ],
  'red-mage': [
    { id: 'red-magic', name: 'Red Magic', description: 'Cast Black and White Magic spells.' },
    { id: 'dualcast', name: 'Dualcast', description: 'Cast two spells at once.' },
  ],
  'time-mage': [
    { id: 'time-magic', name: 'Time Magic', description: 'Cast Time Magic spells.' },
  ],
  summoner: [
    { id: 'summon', name: 'Summon', description: 'Summon magical beasts for aid.' },
    { id: 'call', name: 'Call', description: 'Summon a random Summon without MP cost.' },
  ],
  berserker: [],
  'mystic-knight': [
    { id: 'spellblade', name: 'Spellblade', description: 'Enchant weapons with different magics.' },
  ],
  beastmaster: [
    { id: 'calm', name: 'Calm', description: 'Paralyzes an enemy.' },
    { id: 'control', name: 'Control', description: 'Takes control of an enemy.' },
    { id: 'catch', name: 'Catch', description: 'Catches a weakened enemy.' },
    { id: 'release', name: 'Release', description: 'Releases a captured monster to fight.' },
  ],
  geomancer: [
    { id: 'gaia', name: 'Gaia', description: 'Magic attack based on terrain type.' },
  ],
  ninja: [
    { id: 'smoke', name: 'Smoke', description: 'Use smokescreen to escape from battle.' },
    { id: 'image', name: 'Image', description: 'Creates illusion to absorb two physical attacks.' },
    { id: 'throw', name: 'Throw', description: 'Throws a weapon at an enemy to inflict damage.' },
  ],
  ranger: [
    { id: 'animals', name: 'Animals', description: 'Calls an animal companion for various effects.' },
    { id: 'aim', name: 'Aim', description: 'Guarantees a hit when attacking.' },
    { id: 'rapid-fire', name: 'Rapid Fire', description: 'Attacks four times for half damage.' },
  ],
  bard: [
    { id: 'hide', name: 'Hide', description: 'Duck out of sight to avoid damage.' },
    { id: 'reveal', name: 'Reveal', description: 'Return to the battlefield.' },
    { id: 'sing', name: 'Sing', description: 'Sings songs for various effects.' },
  ],
  dragoon: [
    { id: 'jump', name: 'Jump', description: 'Jump into the air to avoid attacks, then strike.' },
    { id: 'lance', name: 'Lance', description: 'Lunge at an enemy with a spear.' },
  ],
  dancer: [
    { id: 'flirt', name: 'Flirt', description: 'Charm an enemy to make them skip their turn.' },
    { id: 'dance', name: 'Dance', description: 'Perform dances for various effects.' },
  ],
  samurai: [
    { id: 'mineuchi', name: 'Mineuchi', description: 'Stun an enemy with the flat of the blade.' },
    { id: 'zeninage', name: 'Zeninage', description: 'Throw gil at an enemy for damage.' },
    { id: 'iainuki', name: 'Iainuki', description: 'Instant death attack.' },
  ],
  chemist: [
    { id: 'mix', name: 'Mix', description: 'Combine two items to create various effects.' },
    { id: 'drink', name: 'Drink', description: 'Drink a potion.' },
    { id: 'recover', name: 'Recover', description: 'Restore HP and MP.' },
    { id: 'revive', name: 'Revive', description: 'Revive a fallen ally.' },
  ],
}

const PASSIVE_IDS = new Set(
  Object.values(JOB_PASSIVES).flatMap((arr) => arr.map((p) => p.id))
)

/** Slot abilities only (exclude passives and equip abilities). Includes support + command abilities. */
function getSlotAbilitiesForJob(jobId: string): SlotAbility[] {
  const support = JOB_ALL_SUPPORT[jobId] ?? []
  const commands = JOB_COMMAND_ABILITIES[jobId] ?? []
  const all = [...support, ...commands]
  const seen = new Set<string>()
  return all.filter((a) => {
    if (seen.has(a.id)) return false
    if (PASSIVE_IDS.has(a.id) || EQUIP_ABILITY_IDS.has(a.id)) return false
    seen.add(a.id)
    return true
  })
}

/**
 * Get combined slot abilities from both jobs (deduplicated by id).
 * Same ability can be selected in both slots.
 */
export function getCombinedSlotAbilities(jobId1: string, jobId2: string): SlotAbility[] {
  const a1 = getSlotAbilitiesForJob(jobId1)
  const a2 = getSlotAbilitiesForJob(jobId2)
  const seen = new Set<string>()
  const combined: SlotAbility[] = []
  for (const a of [...a1, ...a2]) {
    if (!seen.has(a.id)) {
      seen.add(a.id)
      combined.push(a)
    }
  }
  return combined.sort((a, b) => a.name.localeCompare(b.name))
}
