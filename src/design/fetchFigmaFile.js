import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

const fetchFigmaFile = (fileId) => {
  const URL = `https://api.figma.com/v1/files/${fileId}`

  return fetch(URL, {
    headers: { 'X-Figma-Token': process.env.FIGMA_TOKEN },
  }).then((response) => response.json())
}

export default fetchFigmaFile
