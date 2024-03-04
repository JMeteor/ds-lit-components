import { DesignToken } from '@d/types/DesignToken.ts'

export const generateCssVariables = (tokens: DesignToken[]): string => {
  tokens.sort((a, b) => a.name.localeCompare(b.name))

  let cssVariables = ':root {\n'

  tokens.forEach((token) => {
    const cssVarName = `--${token.name}`
    cssVariables += `  ${cssVarName}: ${token.value};\n`
  })

  cssVariables += '}'

  return cssVariables
}
