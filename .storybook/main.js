const { mergeConfig } = require('vite')

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-actions',
    '@storybook/addon-backgrounds',
    '@storybook/addon-controls',
    '@storybook/addon-docs',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
    '@storybook/addon-viewport',
    '@storybook/addon-toolbars',
  ],

  staticDirs: ['../public'],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  viteFinal: async (config) => {
    const viteConfig = await import('../vite.config.js')
    return mergeConfig(config, viteConfig.default || viteConfig)
  },

  docs: {
    autodocs: true,
  },
}
