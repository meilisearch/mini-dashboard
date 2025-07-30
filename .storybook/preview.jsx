import React from 'react'
import theme from '../src/theme.js'
import GlobalStyle from '../src/GlobalStyle.js'

import { ThemeProvider } from 'styled-components'

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
]
