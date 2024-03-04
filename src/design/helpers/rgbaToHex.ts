export const rgbaToHex = (rgba: string): string => {
  const matches = rgba.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d(\.\d+)?)\)/i)

  if (!matches) {
    throw new Error('Invalid RGBA input')
  }

  const red = parseInt(matches[1])
  const green = parseInt(matches[2])
  const blue = parseInt(matches[3])
  const alpha = parseFloat(matches[4])

  const hexRed = red.toString(16).padStart(2, '0')
  const hexGreen = green.toString(16).padStart(2, '0')
  const hexBlue = blue.toString(16).padStart(2, '0')

  let hexAlpha = ''

  if (alpha !== 1) {
    hexAlpha = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, '0')
  }

  return `#${hexRed}${hexGreen}${hexBlue}${hexAlpha}`
}
