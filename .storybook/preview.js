import React from 'react'
import theme from 'theme'
import GlobalStyle from 'GlobalStyle'

import { ThemeProvider } from 'styled-components'

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
]
