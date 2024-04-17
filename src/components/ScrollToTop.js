import React from 'react'
import Color from 'color'
import styled from 'styled-components'

import IconButton from 'components/IconButton'
import ArrowDownIcon from 'components/icons/ArrowDown'

const ArrowDown = styled(ArrowDownIcon)`
  transform: rotate(180deg);
  color: white;
`

const ScrollButton = styled(IconButton)`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: ${(p) => Color(p.theme.colors.gray[2]).alpha(0.4)};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 300ms;

  &:hover,
  &:focus {
    background-color: ${(p) => Color(p.theme.colors.gray[4])};
  }
`

export const scrollToTop = () => {
  window.scroll({ top: 0, behavior: 'smooth' })
}

const ScrollToTop = () => (
  <ScrollButton onClick={() => scrollToTop()} aria-label="scroll to top">
    <ArrowDown width={12} />
  </ScrollButton>
)

export default ScrollToTop
