import React from 'react'
import styled from 'styled-components'

const A = styled.a`
  color: ${(p) => p.theme.colors.main.default};
  text-decoration: underline;
  transition: color 300ms;
  &:hover {
    color: ${(p) => p.theme.colors.main.hover};
  }
`

const Link = ({ href, target = '_blank', children }) => (
  <A href={href} target={target} rel="noreferrer">
    {children}
  </A>
)

export default Link
