import { Node } from '@figma/rest-api-spec';
import { TextToken } from '@/tokens/types/TextToken.ts';
import { StyleNode } from '@/tokens/types/StyleNode.ts';
import { parseTokenName } from '@/tokens/helpers/parseTokenName.ts';

export const mapTextTokens = (nodesData: Node[]): TextToken[] => {
  return nodesData
    ?.filter(isTextNode)
    .map(createTextToken)
    .filter(Boolean) as TextToken[];
};

const isTextNode = (node: Node): node is StyleNode => node.type === 'TEXT';

const createTextToken = (textNode: StyleNode): TextToken | null => {
  if (!textNode.style) return null;

  return {
    id: textNode.id,
    name: parseTokenName(textNode.name),
    value: textNode.style,
  };
};
