export default {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],

  staticDirs: ['../public'],

  framework: {
    name: "@storybook/react-vite",
    options: {}
  },

  docs: {
    autodocs: true
  }
}