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
    const appViteConfig = await import('../vite.config.js')

   return mergeConfig(config, {
     plugins: appViteConfig.plugins,
     esbuild: appViteConfig.esbuild,
   })
  },

  docs: {
    autodocs: true,
  },
}
