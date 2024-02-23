import fetchFigmaFile from './fetchFigmaFile.js'

// const FILE_ID = '5c22sZuGvYByweBe0kgCbY' // jacob
const FILE_ID = 'HuzQwniEZw81EOhWHEGa5J' // moje

async function getFile() {
  const { document, styles } = await fetchFigmaFile(FILE_ID)

  const mappedStyles = mapFillStyles({ styles })

  const result = mapStyleToNode(document, mappedStyles)

  const parsedColors = result.map(({ name, color }) => ({
    name: parseTokenName(name),
    color: parseColor(color),
  }))
  console.log(parsedColors)
}

const mapFillStyles = ({ styles }) => {
  return Object.entries(styles)
    .filter(([, style]) => style.styleType === 'FILL')
    .map(([id, style]) => ({ id: id, name: style.name }))
}

const isLeaf = (node) => node != null && !('children' in node)
// Style node.type === 'ELLIPSE'
const isStyle = (node) => node != null && node.type === 'ELLIPSE'
// Variable node.type === 'RECTANGLE'
const isVariable = (node) => node != null && node.type === 'RECTANGLE'

const filterStyleNodes = (node, styleId) => {
  if (isLeaf(node)) {
    return isStyle(node) && node.styles && node.styles.fill === styleId
      ? node
      : undefined
  } else {
    return node.children
      .map((item) => filterStyleNodes(item, styleId))
      .reduce(
        (accumulator, current) => (accumulator != null ? accumulator : current),
        undefined
      )
  }
}

const mapStyleToNode = (document, styles) =>
  styles
    .map(({ name, id }) => {
      const node = filterStyleNodes(document, id)

      const color =
        isStyle(node) && node.fills[0] ? node.fills[0].color : undefined
      return { name, color }
    })
    .filter(({ color }) => color !== undefined) // remove all not used styles

const parseColor = (color) => {
  return `rgba(${Math.floor(color.r * 255)}, ${Math.floor(
    color.g * 255
  )}, ${Math.floor(color.b * 255)}, ${color.a})`
}

const parseTokenName = (name) => {
  const parts = name.split('/')

  if (parts[parts.length - 1] === 'default') {
    parts.pop()
  }

  return parts.join('-')
}

await getFile()
