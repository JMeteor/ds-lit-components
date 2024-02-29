import { GetFileStylesResponse, PublishedStyle } from '@figma/rest-api-spec'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

const fetchFigmaStyles = async (
  fileId: string
): Promise<PublishedStyle[] | undefined> => {
  const URL = `https://api.figma.com/v1/files/${fileId}/styles`
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
    const figmaStylesResponse = data as GetFileStylesResponse

    return figmaStylesResponse.meta.styles
  } catch (error) {
    console.error(error)
  }
}

export default fetchFigmaStyles
