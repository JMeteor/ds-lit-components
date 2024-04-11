import { BlendMode, Node, RGBA } from '@figma/rest-api-spec'

export type StyleNode = Node & {
  fills: StyleFill[]
}

export type StyleFill = {
  blendMode: BlendMode
  type: 'SOLID'
  color: RGBA
}
