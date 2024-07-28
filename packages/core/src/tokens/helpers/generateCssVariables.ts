import { ColorToken } from '@/tokens/types/ColorToken.ts';
import { TextToken } from '@/tokens/types/TextToken.ts';

const fontProperties = [
  'fontFamily',
  'fontSize',
  'fontWeight',
  'letterSpacing',
  'lineHeightPx',
  'lineHeightPercent',
  'textAlign',
];

const prefix = 'ds';

export const generateCssVariables = (
  colorTokens: ColorToken[],
  textTokens?: TextToken[]
): string => {
  colorTokens.sort((a, b) => a.name.localeCompare(b.name));

  let cssVariables = ':root {\n';

  colorTokens.forEach((token) => {
    const cssVarName = `--${prefix}-${token.name}`;
    cssVariables += `  ${cssVarName}: ${token.value};\n`;
  });

  if (textTokens) {
    textTokens.forEach((token) => {
      const baseName = `--${prefix}-${token.name
        .replace(/\s+/g, '-')
        .toLowerCase()}`;

      fontProperties.forEach((prop) => {
        if (!token.value[prop]) return;

        let propertyValue = token.value[prop];

        if (typeof propertyValue === 'number' && prop === 'lineHeightPx') {
          // Convert number to pixels for lineHeightPx
          propertyValue = `${propertyValue}px`;
        }

        const cssVarName = `${baseName}-${prop
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .toLowerCase()}`; // convert camelCase property names to kebab-case
        cssVariables += `  ${cssVarName}: ${propertyValue};\n`;
      });
    });
  }

  cssVariables += '}';

  return cssVariables;
};
