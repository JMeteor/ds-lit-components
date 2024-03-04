import { mapDesignTokens } from '@d/helpers/mapDesignTokens.ts';
import { generateCssVariables } from '@d/helpers/generateCssVariables.ts';
import FigmaService from '@d/services/FigmaService.ts';
import { writeFile } from 'fs/promises';

// const FILE_ID = '5c22sZuGvYByweBe0kgCbY' // jacob
const FILE_ID = 'MYI5LujaJMRevufayyMMl4'; // jacob backup

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
    'src/styles/variables.css',
    generateCssVariables(designTokens)
  );
})();
