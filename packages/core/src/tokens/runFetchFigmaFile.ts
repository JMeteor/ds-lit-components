import { mapDesignTokens } from '@/tokens/helpers/mapDesignTokens.ts';
import { generateCssVariables } from '@/tokens/helpers/generateCssVariables.ts';
import FigmaService from '@/tokens/services/FigmaService.ts';
import { writeFile } from 'fs/promises';

const FILE_ID = 'IRdkRXDkBsjEqVestx6Bbt'; // jacob backup

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

  const designTokens = mapDesignTokens(nodesData);
  // console.log(designTokens)

  await writeFile(
    'dist/styles/variables.css',
    generateCssVariables(designTokens)
  );
})();
