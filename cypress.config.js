// eslint-disable-next-line import/no-extraneous-dependencies
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  watchForFileChanges: true,
  retries: 0,
  viewportWidth: 1440,
  viewportHeight: 900,
  env: {
    host: 'http://0.0.0.0:7700',
    apiKey: 'masterKey',
    wrongApiKey: 'wrongApiKey',
    waitingTime: 250,
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
