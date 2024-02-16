import type { StorybookConfig } from '@storybook/web-components-vite'
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  async viteFinal(config, { configType }) {
    // You can add Vite's configuration here based on 'configType',
    // which is 'DEVELOPMENT' for `storyboo start` and 'PRODUCTION' for `storybook build`.
    config.optimizeDeps = config.optimizeDeps ?? {}

    console.log(configType)
    config.optimizeDeps.include = [
      ...(config.optimizeDeps?.include ?? []),
      '@storybook/web-components-vite',
    ]
    config.optimizeDeps.exclude = [
      ...(config.optimizeDeps?.exclude ?? []),
      'lit',
      'lit-html',
    ]

    // For example, you can add other vite plugins.
    // config.plugins.push(createSomeVitePlugin());

    return config
  },
  docs: {
    autodocs: 'tag',
  },
}
export default config
