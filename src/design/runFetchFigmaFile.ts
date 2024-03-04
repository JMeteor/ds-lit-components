import fetchFigmaStyles from './fetchFigmaStyles.ts'
import fetchFigmaNodes from './fetchFigmaNodes.ts'
import { PublishedStyle } from '@figma/rest-api-spec'
import { StyleNode } from './types/StyleNode.ts'
import { DesignToken } from './types/DesignToken.ts'
import { parseTokenValue } from './helpers/parseTokenValue.ts'
import { parseTokenName } from './helpers/parseTokenName.ts'
import { generateCssVariables } from './helpers/generateCssVariables.ts'
import { writeFile } from 'fs/promises'

// const FILE_ID = '5c22sZuGvYByweBe0kgCbY' // jacob
const FILE_ID = 'HuzQwniEZw81EOhWHEGa5J'

;(async () => {
  const styles = await fetchFigmaStyles(FILE_ID)
  // console.log(styles)

  if (!styles) return

  const styleNodeIds = styles.map((style: PublishedStyle) => style.node_id)
  // console.log(styleNodeIds)

  const nodesData = await fetchFigmaNodes(FILE_ID, styleNodeIds)
  // console.log(nodesData)

  if (!nodesData) return

  const tokens: DesignToken[] = nodesData
    ?.map((node) => {
      const styleNode = node as StyleNode

      if (styleNode.fills) {
        const fills = styleNode.fills

        return {
          id: styleNode.id,
          name: parseTokenName(styleNode.name),
          value: parseTokenValue(fills[0].color),
        }
      }
    })
    .filter(Boolean) as any[]
  // console.log(tokens)

  await writeFile('src/assets/variables.css', generateCssVariables(tokens))
})()
