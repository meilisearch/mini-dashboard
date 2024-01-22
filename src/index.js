import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import theme from 'theme'
import App from 'App'
import GlobalStyle from 'GlobalStyle'
import { MeiliSearchClientProvider } from 'context/MeilisearchClientContext'

ReactDOM.render(
  <MeiliSearchClientProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </MeiliSearchClientProvider>,
  document.getElementById('root')
)
