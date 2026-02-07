/**
 * Parse a hex color to RGB components (0-255).
 * Handles #rgb, #rrggbb, and #rrggbbaa formats.
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace(/^#/, '')
  const len = clean.length
  if (len === 3) {
    return {
      r: parseInt(clean[0] + clean[0], 16),
      g: parseInt(clean[1] + clean[1], 16),
      b: parseInt(clean[2] + clean[2], 16),
    }
  }
  if (len >= 6) {
    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16),
    }
  }
  return { r: 128, g: 128, b: 128 }
}

/**
 * Convert RGB to hex string.
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const c = Math.round(Math.max(0, Math.min(255, n)))
    return c.toString(16).padStart(2, '0')
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * Blend two hex colors with a 50/50 mix.
 * @param hex1 First color (e.g. "#6b8cce")
 * @param hex2 Second color (e.g. "#e8e8e8")
 * @returns Blended hex color
 */
export function mixHexColors(hex1: string, hex2: string): string {
  const a = hexToRgb(hex1)
  const b = hexToRgb(hex2)
  return rgbToHex(
    (a.r + b.r) / 2,
    (a.g + b.g) / 2,
    (a.b + b.b) / 2
  )
}
