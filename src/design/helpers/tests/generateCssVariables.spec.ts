import { describe, it, expect } from 'vitest'
import { DesignToken } from '../../types/DesignToken.ts'
import { generateCssVariables } from './../generateCssVariables.ts'

describe('generateCssVariables', () => {
  it('should generate correct CSS variables', () => {
    const tokens: DesignToken[] = [
      { id: '1', name: 'color-primary', value: '#ff0000' },
      { id: '2', name: 'color-secondary', value: '#00ff00' },
    ]

    const result = generateCssVariables(tokens)

    const expected = `:root {\n  --color-primary: #ff0000;\n  --color-secondary: #00ff00;\n}`

    expect(result).toEqual(expected)
  })

  it('should sort tokens by name', () => {
    const tokens: DesignToken[] = [
      { id: '1', name: 'color-z', value: '#ff0000' },
      { id: '2', name: 'color-a', value: '#00ff00' },
    ]

    const result = generateCssVariables(tokens)

    const expected = `:root {\n  --color-a: #00ff00;\n  --color-z: #ff0000;\n}`

    expect(result).toEqual(expected)
  })
})
