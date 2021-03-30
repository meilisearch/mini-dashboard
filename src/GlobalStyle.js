import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
  }
  * {
    font-family: 'Work Sans';
    box-sizing: border-box;
  }

  mark, ::selection {
    background-color: ${(p) => p.theme.colors.main.light};
  }

  @font-face {
    font-family: 'Work Sans';
    src: url("fonts/Work_Sans/light.woff2") format("woff2");
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Work Sans';
    src: url("fonts/Work_Sans/regular.woff2") format("woff2");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Work Sans';
    src: url("fonts/Work_Sans/medium.woff2") format("woff2");
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Work Sans';
    src: url("fonts/Work_Sans/bold.woff2") format("woff2");
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Barlow';
    src: url("fonts/Barlow/regular.woff2") format("woff2");
    font-weight: 400;
    font-style: normal;
  }

`

export default GlobalStyle
