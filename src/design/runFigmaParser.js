import { FigmaParser } from '@ltd-toolbox/figma-parser'
import dotenv from 'dotenv'

dotenv.config()

const FILE_ID = 'HuzQwniEZw81EOhWHEGa5J'

;(async () => {
  const parser = new FigmaParser(process.env.FIGMA_TOKEN)

  const document = await parser.styles(FILE_ID)

  console.log(document)
  // [...]
})()
