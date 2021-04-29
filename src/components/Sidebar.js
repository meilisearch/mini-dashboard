import React from 'react'
import Color from 'color'
import styled from 'styled-components'
import PropTypes from 'prop-types'
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
  display: flex;
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
  width: 18px;
  height: 9px;
  transition: color 300ms;
`

const OpeningIcon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 300ms;
`

const Disclosure = styled(ReakitDisclosure)`
  position: absolute;
  top: 24px;
  right: 12px;
  z-index: 1;
  cursor: pointer;
  padding: 6px;
  background-color: transparent;
  border: 0;

  svg {
    color: ${(p) => p.theme.colors.gray[7]};
    transition: color 300ms;
  }
  &:hover,
  &:focus {
    outline: none;

    svg {
      color: ${(p) => p.theme.colors.main.default};
    }
  }
`

const DisclosureContent = styled(ReakitDisclosureContent)`
  transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
  opacity: 0;
  height: 100%;
  width: 100%;
  transform: translateX(-100%);
  &[data-enter] {
    opacity: 1;
    transform: translateX(0);
  }
`

const Sidebar = ({
  sidebarIcon,
  visible = true,
  onChange = () => {},
  children,
  ...props
}) => {
  const disclosure = useDisclosureState({ animated: true, visible })
  const [toggled, setToggled] = React.useState(false)

  const openingIcon = sidebarIcon || (
    <Arrow style={{ transform: 'rotate(270deg)' }} />
  )
  const openIconRef = React.useRef(null)
  const closeIconRef = React.useRef(null)

  React.useEffect(() => {
    if (toggled) {
      if (!disclosure.visible) {
        openIconRef?.current?.focus()
      } else {
        closeIconRef?.current?.focus()
      }
      onChange(disclosure.visible)
    }
  }, [openIconRef, disclosure.visible])

  return (
    <SidebarWrapper aria-expanded={disclosure.visible} {...props}>
      {!disclosure.visible && (
        <Disclosure
          ref={openIconRef}
          onClick={() => setToggled(true)}
          {...disclosure}
        >
          <OpeningIcon>{openingIcon}</OpeningIcon>
        </Disclosure>
      )}
      <DisclosureContent {...disclosure}>
        {disclosure.visible && (
          <Disclosure
            ref={closeIconRef}
            onClick={() => {
              disclosure.hide()
              setToggled(true)
            }}
          >
            <Arrow style={{ transform: 'rotate(90deg)' }} />
          </Disclosure>
        )}
        {children}
      </DisclosureContent>
    </SidebarWrapper>
  )
}

Sidebar.propTypes = {
  /**
   * The icon you want to display to open the sidebar. Arrow by default
   */
  sidebarIcon: PropTypes.node,
  /**
   * The initial state of the sidebar (open or closed)
   */
  visible: PropTypes.bool,
  /**
   * Action to trigger on toggle change
   */
  onChange: PropTypes.func,
  /**
   * Content of the sidebar
   */
  children: PropTypes.node,
}

Sidebar.defaultProps = {
  sidebarIcon: <Arrow style={{ transform: 'rotate(270deg)' }} />,
  visible: true,
  onChange: null,
  children: null,
}

export default Sidebar
