import fetchFigmaStyles from './fetchFigmaStyles.ts'
import fetchFigmaNodes from './fetchFigmaNodes.ts'
import { generateDesignTokens } from './helpers/mapDesignTokens.ts'
import { generateCssVariables } from './helpers/generateCssVariables.ts'
import { writeFile } from 'fs/promises'

// const FILE_ID = '5c22sZuGvYByweBe0kgCbY' // jacob
const FILE_ID = 'HuzQwniEZw81EOhWHEGa5J'

;(async () => {
  const styles = await fetchFigmaStyles(FILE_ID)
  // console.log(styles)

  if (!styles) return

  const styleNodeIds = styles.map((style) => style.node_id)
  // console.log(styleNodeIds)

  const nodesData = await fetchFigmaNodes(FILE_ID, styleNodeIds)
  // console.log(nodesData)

  if (!nodesData) return

  const designTokens = generateDesignTokens(nodesData)
  // console.log(designTokens)

  await writeFile(
    'src/assets/variables.css',
    generateCssVariables(designTokens)
  )
})()
