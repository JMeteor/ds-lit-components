import FigmaService from '@/tokens/services/FigmaService.ts';
import { generateCssVariables } from '@/tokens/helpers/generateCssVariables.ts';
import { writeFile, mkdir } from 'fs/promises';
import { dirname } from 'path';
import { mapColorTokens } from '@d/helpers/colors/mapColorTokens.ts';
import { mapTextTokens } from '@d/helpers/fonts/mapTextTokens.ts';

const FILE_ID = 'IRdkRXDkBsjEqVestx6Bbt'; // jacob backup

const FILE_PATH = 'src/css/variables.css';
const figmaService = new FigmaService();

(async () => {
  const styles = await figmaService.fetchStyles(FILE_ID);
  // console.log(styles);

  if (!styles) return;

  const styleNodeIds = styles.map((style) => style.node_id);
  // console.log(styleNodeIds)

  const nodesData = await figmaService.fetchNodes(FILE_ID, styleNodeIds);
  // console.log(nodesData);

  if (!nodesData) return;

  const colorStyles = nodesData.filter((node) => node.type === 'RECTANGLE');
  const textStyles = nodesData.filter((node) => node.type === 'TEXT');

  const colorDesignTokens = mapColorTokens(colorStyles);
  // console.log(colorDesignTokens);

  const fontDesignTokens = mapTextTokens(textStyles);
  // console.log(fontDesignTokens);

  await mkdir(dirname(FILE_PATH), { recursive: true });

  await writeFile(
    FILE_PATH,
    generateCssVariables(colorDesignTokens, fontDesignTokens)
  );
})();
