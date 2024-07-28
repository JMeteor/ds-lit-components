import { BlendMode, Node, RGBA, TypeStyle } from '@figma/rest-api-spec';

export type StyleNode = Node & {
  fills: StyleFill[];
  style: TypeStyle;
};

export type StyleFill = {
  blendMode: BlendMode;
  type: 'SOLID';
  color: RGBA;
};
