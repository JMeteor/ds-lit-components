import { Node } from '@figma/rest-api-spec';
import { ColorToken } from '@/tokens/types/ColorToken.ts';
import { StyleNode } from '@/tokens/types/StyleNode.ts';
import { ColorMode } from '@/tokens/enums/ColorMode.enum.ts';
import { parseTokenName } from '../parseTokenName.ts';
import { parseTokenValue } from './parseTokenValue.ts';

export const mapColorTokens = (nodesData: Node[]): ColorToken[] => {
  return nodesData
    ?.filter(isRectangleNode)
    .map((node) => {
      const styleNode = node as StyleNode;

      if (styleNode.fills) {
        const fills = styleNode.fills;

        return {
          id: styleNode.id,
          name: parseTokenName(styleNode.name),
          value: parseTokenValue(fills[0].color, ColorMode.HEX),
        };
      }
    })
    .filter(Boolean) as ColorToken[];
};

const isRectangleNode = (node: Node): node is StyleNode =>
  node.type === 'RECTANGLE';
