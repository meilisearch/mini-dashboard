import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import theme from 'theme'
import App from 'App'
import Browser from 'pages/Browser'
import GlobalStyle from 'GlobalStyle'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/browser', element: <Browser /> },
])

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <RouterProvider router={router} />
  </ThemeProvider>,
  document.getElementById('root')
)
