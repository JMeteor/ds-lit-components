import { describe, it, expect } from 'vitest'
import { parseTokenName } from './../parseTokenName.ts'

describe('parseTokenName', () => {
  it('should correctly parse token name without "default"', () => {
    const name = 'color/brand'
    const result = parseTokenName(name)
    const expected = 'color-brand'
    expect(result).toEqual(expected)
  })

  it('should correctly parse token name with "default"', () => {
    const name = 'color/brand/default'
    const result = parseTokenName(name)
    const expected = 'color-brand'
    expect(result).toEqual(expected)
  })

  it('should correctly parse token name with uppercase letters', () => {
    const name = 'Color/Brand/Default'
    const result = parseTokenName(name)
    const expected = 'color-brand'
    expect(result).toEqual(expected)
  })
})
