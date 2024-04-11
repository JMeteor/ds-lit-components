import {
  GetFileNodesResponse,
  GetFileStylesResponse,
  PublishedStyle,
} from '@figma/rest-api-spec'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

class FigmaService {
  private readonly URL: string = `https://api.figma.com/v1/files/`
  private readonly token: string = process.env.FIGMA_TOKEN ?? ''

  constructor() {
    if (!this.token) {
      throw new Error('No token provided')
    }
  }

  async fetchStyles(fileId: string): Promise<PublishedStyle[] | undefined> {
    try {
      const response = await fetch(this.URL + `${fileId}/styles`, {
        headers: { 'X-Figma-Token': this.token },
      })

      const data = await response.json()
      const figmaStylesResponse = data as GetFileStylesResponse

      return figmaStylesResponse.meta.styles
    } catch (error) {
      console.error(error)
    }
  }

  async fetchNodes(fileId: string, nodesIds: string[]) {
    try {
      const response = await fetch(
        this.URL + `${fileId}/nodes?ids=${nodesIds.join(',')}`,
        {
          headers: { 'X-Figma-Token': this.token },
        }
      )

      const data = await response.json()
      const figmaNodesResponse = data as GetFileNodesResponse

      return Object.values(figmaNodesResponse.nodes).map(
        ({ document }) => document
      )
    } catch (error) {
      console.error(error)
    }
  }
}

export default FigmaService
