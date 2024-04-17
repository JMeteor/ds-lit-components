import { DesignToken } from '@/tokens/types/DesignToken.ts';

export const generateCssVariables = (tokens: DesignToken[]): string => {
  const prefix = 'ds';

  tokens.sort((a, b) => a.name.localeCompare(b.name));

  let cssVariables = ':root {\n';

  tokens.forEach((token) => {
    const cssVarName = `--${prefix}-${token.name}`;
    cssVariables += `  ${cssVarName}: ${token.value};\n`;
  });

  cssVariables += '}';

  return cssVariables;
};
