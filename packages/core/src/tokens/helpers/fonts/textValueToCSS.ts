import { TypeStyle } from '@figma/rest-api-spec';

export const textValueToCSS = (value: TypeStyle): string => {
  const {
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    textAlignHorizontal,
  } = value;

  return `
    font-family: ${fontFamily};
    font-size: ${fontSize}px;
    font-weight: ${fontWeight};
    letter-spacing: ${letterSpacing}px;
    text-align: ${textAlignHorizontal};
  `;
};
