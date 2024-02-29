import fetchFigmaStyles from './fetchFigmaStyles.ts'
import fetchFigmaNodes from './fetchFigmaNodes.ts'
import { PublishedStyle } from '@figma/rest-api-spec'

// const FILE_ID = '5c22sZuGvYByweBe0kgCbY' // jacob
const FILE_ID = 'HuzQwniEZw81EOhWHEGa5J' // moje

async function getFile() {
  const styles = await fetchFigmaStyles(FILE_ID)

  if (!styles) return

  const styleNodeIds = styles.map((style: PublishedStyle) => style.node_id)
  // console.log(styleNodeIds)

  const nodesData = await fetchFigmaNodes(FILE_ID, styleNodeIds)
  console.log(nodesData)
  // const { document, styles } = response
  // console.log(response.document)
  // console.log()
  // const mappedStyles = mapFillStyles({ styles })
  // console.log(mappedStyles)
  // findFills(document)
  // console.log(findFills(document))
  // const result = mapStyleToNode(document, mappedStyles)
  // console.log(result)
  // const parsedColors = result.map(({ name, color }) => ({
  //   name: parseTokenName(name),
  //   color: parseColor(color),
  // }))
}

// const parseColor = (color) => {
//   return `rgba(${Math.floor(color.r * 255)}, ${Math.floor(
//     color.g * 255
//   )}, ${Math.floor(color.b * 255)}, ${color.a})`
// }
//
// const parseTokenName = (name) => {
//   const parts = name.split('/')
//
//   if (parts[parts.length - 1] === 'default') {
//     parts.pop()
//   }
//
//   return parts.join('-')
// }

await getFile()
