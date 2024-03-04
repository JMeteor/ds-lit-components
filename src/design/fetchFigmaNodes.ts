import fetch from 'node-fetch'
import { GetFileNodesResponse, Node } from '@figma/rest-api-spec'

const fetchFigmaNodes = async (
  fileId: string,
  nodeIds: string[]
): Promise<Node[] | undefined> => {
  const URL = `https://api.figma.com/v1/files/${fileId}/nodes?ids=${nodeIds.join(
    ','
  )}`
  const token = process.env.FIGMA_TOKEN

  if (!token) {
    console.error('No token provided')
    return
  }

  try {
    const response = await fetch(URL, {
      headers: { 'X-Figma-Token': token },
    })

    const data = await response.json()
    const figmaNodesResponse = data as GetFileNodesResponse

    return Object.values(figmaNodesResponse.nodes).map(
      ({ document }) => document
    )
  } catch (error) {
    console.error(error)
  }
}

export default fetchFigmaNodes