import React from 'react'
import Color from 'color'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { space, color } from 'styled-system'
import theme from 'theme'

const StyledButton = styled.button`
  ${space};
  ${color};
  outline: none;
  background-color: transparent;
  cursor: pointer;
  svg {
    display: block;
  }
  padding: 4px 6px;
  border: none;
  &:focus {
    svg {
      filter: drop-shadow(
        0px 0px 3px ${(p) => Color(p.theme.colors[p.color]).alpha(0.2)}
      );
    }
  }
`

const IconButton = React.forwardRef(
  ({ color: iconColor, children, ...props }, ref) => (
    <StyledButton
      color={iconColor || theme.colors.main.default}
      ref={ref}
      {...props}
    >
      {children}
    </StyledButton>
  )
)

IconButton.propTypes = {
  /**
   * Color of the icon
   */
  color: PropTypes.node,
  /**
   * Text to be displayed
   */
  children: PropTypes.node,
}

IconButton.defaultProps = {
  color: null,
  children: null,
}

export default IconButton
