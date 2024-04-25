import { describe, it, expect } from 'vitest';
import { RGBA } from '@figma/rest-api-spec';
import { ColorMode } from '../../enums/ColorMode.enum.ts';
import { parseTokenValue } from '../colors/parseTokenValue.ts';

describe('parseTokenValue', () => {
  it('should correctly parse color to HEX', () => {
    const color: RGBA = { r: 1, g: 0, b: 0, a: 0.5 };
    const result = parseTokenValue(color, ColorMode.HEX);
    const expected = '#ff000080';
    expect(result).toEqual(expected);
  });

  it('should correctly parse color to RGB', () => {
    const color: RGBA = { r: 1, g: 0, b: 0, a: 1 };
    const result = parseTokenValue(color, ColorMode.RGB);
    const expected = 'rgba(255, 0, 0, 1)';
    expect(result).toEqual(expected);
  });

  it('should throw an error for invalid color mode', () => {
    const color: RGBA = { r: 1, g: 0, b: 0, a: 1 };
    expect(() => parseTokenValue(color, 'invalid' as any)).toThrow(
      'Invalid color mode'
    );
  });
});
