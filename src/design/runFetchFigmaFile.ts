import { mapDesignTokens } from './helpers/mapDesignTokens.ts'
import { generateCssVariables } from './helpers/generateCssVariables.ts'
import { writeFile } from 'fs/promises'
import FigmaService from './Figma.service.ts'

// const FILE_ID = '5c22sZuGvYByweBe0kgCbY' // jacob
const FILE_ID = 'HuzQwniEZw81EOhWHEGa5J'

const figmaService = new FigmaService()

;(async () => {
  const styles = await figmaService.fetchStyles(FILE_ID)
  // console.log(styles)

  if (!styles) return

  const styleNodeIds = styles.map((style) => style.node_id)
  // console.log(styleNodeIds)

  const nodesData = await figmaService.fetchNodes(FILE_ID, styleNodeIds)
  // const nodesData = await fetchFigmaNodes(FILE_ID, styleNodeIds)
  // console.log(nodesData)

  if (!nodesData) return

  const designTokens = mapDesignTokens(nodesData)
  // console.log(designTokens)

  await writeFile(
    'src/assets/variables.css',
    generateCssVariables(designTokens)
  )
})()
