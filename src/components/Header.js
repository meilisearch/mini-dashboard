import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.header`
  background-color: ${(p) => p.theme.colors.main};
  color: white;
`

const Header = () => (
  <HeaderWrapper>
    <h1>I’m a title</h1>
  </HeaderWrapper>
)

export default Header
