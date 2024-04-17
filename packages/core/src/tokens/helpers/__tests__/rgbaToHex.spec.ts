import { describe, it, expect } from 'vitest'
import { rgbaToHex } from './../rgbaToHex.ts'

describe('rgbaToHex', () => {
  it('should correctly convert rgba to hex', () => {
    const rgba = 'rgba(255, 0, 0, 1)'
    const result = rgbaToHex(rgba)
    const expected = '#ff0000'
    expect(result).toEqual(expected)
  })

  it('should correctly convert rgba to hex with alpha', () => {
    const rgba = 'rgba(255, 0, 0, 0.5)'
    const result = rgbaToHex(rgba)
    const expected = '#ff000080'
    expect(result).toEqual(expected)
  })

  it('should throw an error for invalid rgba input', () => {
    const rgba = 'invalid'
    expect(() => rgbaToHex(rgba)).toThrow('Invalid RGBA input')
  })
})
