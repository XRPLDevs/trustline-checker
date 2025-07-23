import { stringToHex as stringToHexOnXrpl } from '@xrplf/isomorphic/utils'

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

/**
 * Convert a string to a hex string
 * @param s - The string to convert
 * @returns The hex string
 */
export const stringToHex = (s: string): string => {
  return stringToHexOnXrpl(s)
}

/**
 * Convert a hex string to a string
 * @param s - The hex string to convert
 * @returns The string
 */
export const hexToString = (s: string): string => {
  return Buffer.from(s, 'hex').toString('utf8')
}
