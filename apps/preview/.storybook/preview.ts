import type { Preview } from '@storybook/web-components';

import './preview.css';
import './../../../packages/core/src/css/variables.css';

import '@ds/components';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
