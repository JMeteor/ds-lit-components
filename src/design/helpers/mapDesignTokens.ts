import { Node } from '@figma/rest-api-spec'
import { DesignToken } from '@d/types/DesignToken.ts'
import { StyleNode } from '@d/types/StyleNode.ts'
import { ColorMode } from '@d/enums/ColorMode.enum.ts'
import { parseTokenName } from './parseTokenName.ts'
import { parseTokenValue } from './parseTokenValue.ts'

export const mapDesignTokens = (nodesData: Node[]): DesignToken[] => {
  return nodesData
    ?.map((node) => {
      const styleNode = node as StyleNode

      if (styleNode.fills) {
        const fills = styleNode.fills

        return {
          id: styleNode.id,
          name: parseTokenName(styleNode.name),
          value: parseTokenValue(fills[0].color, ColorMode.HEX),
        }
      }
    })
    .filter(Boolean) as DesignToken[]
}
