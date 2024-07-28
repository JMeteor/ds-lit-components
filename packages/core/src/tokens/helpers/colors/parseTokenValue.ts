import { RGBA } from '@figma/rest-api-spec';
import { rgbaToHex } from './rgbaToHex.ts';
import { ColorMode } from '@d/enums/ColorMode.enum.ts';

export const parseTokenValue = (color: RGBA, colorMode: ColorMode) => {
  const rgbaString = `rgba(${Math.floor(color.r * 255)}, ${Math.floor(
    color.g * 255
  )}, ${Math.floor(color.b * 255)}, ${color.a})`;

  switch (colorMode) {
    case ColorMode.HEX:
      return rgbaToHex(rgbaString);
    case ColorMode.RGB:
      return rgbaString;
    default:
      throw new Error('Invalid color mode');
  }
};
