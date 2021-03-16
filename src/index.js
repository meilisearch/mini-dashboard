import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import theme from 'theme'
import App from 'App'
import GlobalStyle from 'GlobalStyle'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
