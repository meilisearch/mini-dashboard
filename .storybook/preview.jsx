import React from 'react'
import theme from '../src/theme'
import GlobalStyle from '../src/GlobalStyle'

import { ThemeProvider } from 'styled-components'

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
]
