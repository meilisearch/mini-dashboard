import React from 'react'
import Color from 'color'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { space, color } from 'styled-system'
import theme from 'theme'

const variants = {
  default: css`
    border: none;
    padding: 4px 6px;
    &:focus {
      svg {
        filter: drop-shadow(
          0px 0px 3px ${(p) => Color(p.theme.colors[p.color]).alpha(0.2)}
        );
      }
    }
  `,
  bordered: css`
    border-width: 1px;
    border-style: solid;
    border-color: inherit;
    border-radius: 50%;
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 300ms;
    svg {
      transition: color 300ms;
    }
    &:hover,
    &:focus {
      background-color: currentColor;
      svg {
        color: white;
      }
    }
  `,
}

const StyledButton = styled.button`
  ${(p) => p.$variant};
  ${space};
  ${color};
  outline: none;
  background-color: transparent;
  cursor: pointer;
  svg {
    display: block;
  }
`

const IconButton = React.forwardRef(
  ({ color: iconColor, variant, children, ...props }, ref) => {
    const safeVariant = variants[variant] || variants.default

    return (
      <StyledButton
        color={iconColor || theme.colors.main.default}
        $variant={safeVariant}
        ref={ref}
        {...props}
      >
        {children}
      </StyledButton>
    )
  }
)

IconButton.propTypes = {
  /**
   * Color of the icon
   */
  color: PropTypes.node,
  /**
   * variant of the button
   */
  variant: PropTypes.oneOf(['default', 'bordered']),
  /**
   * Text to be displayed
   */
  children: PropTypes.node,
}

IconButton.defaultProps = {
  color: null,
  variant: 'default',
  children: null,
}

export default IconButton
