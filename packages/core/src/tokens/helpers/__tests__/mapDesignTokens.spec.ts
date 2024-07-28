import { describe, it, expect } from 'vitest';
import { Node, RGBA } from '@figma/rest-api-spec';
import { DesignToken } from '../../types/DesignToken.ts';
import { mapDesignTokens } from './../mapDesignTokens.ts';

describe('mapDesignTokens', () => {
  it('should generate correct tokens tokens', () => {
    const nodesData: Node[] = [
      {
        id: '1',
        name: 'color-brand',
        fills: [{ color: { r: 1, g: 0, b: 0, a: 1 } as RGBA }],
      } as Node,
      {
        id: '2',
        name: 'color-neutral',
        fills: [{ color: { r: 0, g: 1, b: 0, a: 1 } as RGBA }],
      } as Node,
    ];

    const result = mapDesignTokens(nodesData);

    const expected: DesignToken[] = [
      { id: '1', name: 'color-brand', value: '#ff0000' },
      { id: '2', name: 'color-neutral', value: '#00ff00' },
    ];

    expect(result).toEqual(expected);
  });

  it('should ignore nodes without fills', () => {
    const nodesData: Node[] = [
      {
        id: '1',
        name: 'color-brand',
        fills: [{ color: { r: 1, g: 0, b: 0, a: 1 } as RGBA }],
      } as Node,
      { id: '2', name: 'color-neutral' } as Node,
    ];

    const result = mapDesignTokens(nodesData);

    const expected: DesignToken[] = [
      { id: '1', name: 'color-brand', value: '#ff0000' },
    ];

    expect(result).toEqual(expected);
  });
});
