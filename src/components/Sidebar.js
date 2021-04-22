import React from 'react'
import Color from 'color'
import styled from 'styled-components'
import { ArrowDown } from 'components/icons'
import {
  useDisclosureState,
  Disclosure as ReakitDisclosure,
  DisclosureContent as ReakitDisclosureContent,
} from 'reakit/Disclosure'

const SidebarWrapper = styled.div`
  background-color: white;
  flex-shrink: 0;
  width: 300px;
  overflow: auto;
  box-shadow: 0px 0px 30px ${(p) => Color(p.theme.colors.gray[0]).alpha(0.07)};
  position: relative;
  margin-left: -246px;
  transition: margin-left 300ms;
  position: sticky;
  top: 0;
  height: 100%;

  &[aria-expanded='true'] {
    margin-left: 0px;
  }
`

const Arrow = styled(ArrowDown)`
  transform: rotate(270deg);
  width: 18px;
  height: 9px;
  transition: transform 300ms;
  color: ${(p) => p.theme.colors.main.default};
`

const SidebarIcon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  color: ${(p) => p.theme.colors.gray[7]};
`

const Disclosure = styled(ReakitDisclosure)`
  position: absolute;
  padding: 6px;
  top: 24px;
  right: 12px;
  z-index: 1;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  transition: transform 300ms;
  transform: translateY(0px);

  svg {
    display: block;
  }

  ${SidebarIcon} + ${Arrow} {
    margin-top: 16px;
  }

  &[aria-expanded='true'] {
    transform: ${(p) =>
      p.$hasSidebarIcon ? 'translateY(-24px)' : 'translateY(0px)'};

    ${SidebarIcon} {
      opacity: 0;
      transition: opacity 300ms;
    }

    ${Arrow} {
      transform: rotate(90deg);
    }
  }
`

const DisclosureContent = styled(ReakitDisclosureContent)`
  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
  &[data-enter] {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

const Sidebar = ({ sidebarIcon, children }) => {
  const disclosure = useDisclosureState({ animated: true })

  return (
    <SidebarWrapper aria-expanded={disclosure.visible}>
      <Disclosure $hasSidebarIcon={sidebarIcon} {...disclosure}>
        {sidebarIcon && <SidebarIcon>{sidebarIcon}</SidebarIcon>}
        <Arrow />
      </Disclosure>
      <DisclosureContent {...disclosure}>{children}</DisclosureContent>
    </SidebarWrapper>
  )
}

export default Sidebar
