import React from 'react'
import Color from 'color'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { space, color } from 'styled-system'
import theme from 'theme'

const variants = {
  default: css`
    padding: 4px 6px;
    border: none;
    &:focus {
      svg {
        filter: drop-shadow(
          0px 0px 3px ${(p) => Color(p.theme.colors[p.color]).alpha(0.2)}
        );
      }
    }
  `,
  bordered: css`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-style: solid;
    border-color: inherit;
    border-radius: 50%;
    &:focus {
      box-shadow: 0px 0px 4px ${(p) => Color(p.color).alpha(0.5)};
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

const IconButton = ({
  variant = 'default',
  color: iconColor,
  children,
  ...props
}) => {
  const safeVariant = variants[variant] || variants.default
  const safeColor = iconColor || theme.colors.main.default
  return (
    <StyledButton $variant={safeVariant} color={safeColor} {...props}>
      {children}
    </StyledButton>
  )
}

IconButton.propTypes = {
  /**
   * Buttons's variant
   */
  variant: PropTypes.oneOf(['default', 'bordered']),
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
  variant: 'default',
  color: null,
  children: null,
}

export default IconButton
