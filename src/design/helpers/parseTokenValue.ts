import { RGBA } from '@figma/rest-api-spec'

export const parseTokenValue = (color: RGBA) => {
  return `rgba(${Math.floor(color.r * 255)}, ${Math.floor(
    color.g * 255
  )}, ${Math.floor(color.b * 255)}, ${color.a})`
}
