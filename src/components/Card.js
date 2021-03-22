import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.li`
  min-height: 320px;
  background-color: white;
  list-style-type: none;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: ${(p) => p.theme.space[4]}px;
`

const Card = ({ children, ...props }) => (
  <Wrapper {...props}>{children}</Wrapper>
)

export default Card
