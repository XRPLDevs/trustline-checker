export function abbreviateString(
  str: string,
  start: number,
  end: number
): string {
  return `${str.slice(0, start)}...${str.slice(-end)}`
}

export function fromHex160bit(str: string): string {
  const encoder = new TextEncoder()
  const bytes = encoder.encode(str)

  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
}

// Decode hex to string
export function toHex160bit(hex: string): string {
  const encoder = new TextDecoder()
  const decoded = encoder.decode(Buffer.from(hex, 'hex'))
  // Remove null characters (\u0000)
  return decoded.replace(/\u0000/g, '')
}
