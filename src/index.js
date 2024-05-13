import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'

import theme from 'theme'
import App from 'App'
import GlobalStyle from 'GlobalStyle'
import { MeiliSearchClientProvider } from 'context/MeilisearchClientContext'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <MeiliSearchClientProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </MeiliSearchClientProvider>
)
