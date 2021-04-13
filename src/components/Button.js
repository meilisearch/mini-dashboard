import React from 'react'
import Color from 'color'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { space, color } from 'styled-system'
import { Button as ReakitButton } from 'reakit/Button'

import Typography from 'components/Typography'
import { ArrowDown } from 'components/icons'

const Arrow = styled(ArrowDown)`
  margin-left: 6px;
`

const variants = {
  default: css`
    padding: 0 24px;
    min-width: 128px;
    background-color: transparent;
    border-width: 1px;
    border-style: solid;
    border-color: ${(p) => p.theme.colors.gray[10]};
    box-shadow: 0px 4px 6px ${Color('#000').alpha(0.04)};
    color: ${(p) => p.theme.colors.gray[0]};
    svg {
      color: ${(p) => p.theme.colors.main.default};
    }

    &:hover,
    &:focus,
    &:active,
    &:active,
    &[aria-expanded='true'] {
      box-shadow: none;
      border-color: ${(p) => p.theme.colors.main.default};
    }
  `,
  filled: css`
    padding: 0 24px;
    min-width: 128px;
    background-color: ${(p) => p.theme.colors.main.default};
    border: 1px solid ${(p) => p.theme.colors.main.default};
    color: white;
    svg {
      color: white;
    }

    &:hover,
    &:focus,
    &:active {
      background-color: ${(p) => p.theme.colors.main.hover};
    }
  `,
  bordered: css`
    padding: 0 24px;
    min-width: 128px;
    background-color: transparent;
    border: 2px solid ${(p) => p.theme.colors.main.default};
    color: ${(p) => p.theme.colors.main.default};
    svg {
      color: ${(p) => p.theme.colors.main.default};
    }

    &:hover,
    &:focus,
    &:active {
      border-color: ${(p) => p.theme.colors.main.hover};
      color: ${(p) => p.theme.colors.main.hover};
    }
  `,
  link: css`
    border: none;
    height: auto !important;
    background-color: transparent;
    color: ${(p) => p.theme.colors.main.default};
    padding: 0 !important;
    span {
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    &:hover,
    &:focus,
    &:active {
      color: ${(p) => p.theme.colors.main.hover};
    }
  `,
  grayscale: css`
    padding: 8px;
    background-color: transparent;
    border: none;
    color: ${(p) => p.theme.colors.gray[2]};

    svg {
      color: ${(p) => p.theme.colors.gray[4]};
    }

    &:hover,
    &:focus,
    &:active {
      background-color: ${(p) => p.theme.colors.gray[11]};
    }
  `,
}

const sizes = {
  medium: css`
    height: 48px;
  `,
  small: css`
    height: 34px;
    span {
      font-size: 14px;
    }
  `,
}

const StyledButton = styled(ReakitButton)`
  ${(p) => p.$variant};
  ${(p) => p.$size};
  ${(p) => p.$shape};
  ${space};
  ${color};

  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  transition: background-color 300ms, color 200ms, box-shadow 300ms,
    border-color 300ms;

  &:hover {
    cursor: pointer;
  }
  svg {
    transition: color 200ms, transform 300ms;
    margin-right: 8px;
  }

  &[aria-expanded='true'] {
    ${Arrow} {
      transform: rotate(180deg);
    }
  }
`

const Button = React.forwardRef(
  (
    {
      as,
      variant = 'default',
      size = 'medium',
      icon,
      toggable = false,
      children,
      ...props
    },
    ref
  ) => {
    const safeVariant = variants[variant] || variants.default
    const safeSize = sizes[size] || sizes.medium
    return (
      <StyledButton
        as={as}
        $variant={safeVariant}
        $size={safeSize}
        ref={ref}
        {...props}
      >
        {icon}
        <Typography variant="typo4">{children}</Typography>
        {toggable && <Arrow style={{ width: 9 }} />}
      </StyledButton>
    )
  }
)

Button.propTypes = {
  /**
   * Custom tag if we don't want a "button" to appear in the DOM
   */
  as: PropTypes.string,
  /**
   * Buttons's variant
   */
  variant: PropTypes.oneOf([
    'default',
    'filled',
    'bordered',
    'clean',
    'link',
    'grayscale',
  ]),
  /**
   * Buttons's size
   */
  size: PropTypes.oneOf(['medium', 'small']),
  /**
   * The icon provided to appear on the left
   */
  icon: PropTypes.node,
  /**
   * Whether the button is toggable or not
   */
  toggable: PropTypes.bool,
  /**
   * Text to be displayed
   */
  children: PropTypes.node,
}

Button.defaultProps = {
  as: null,
  variant: 'default',
  size: 'medium',
  icon: null,
  toggable: false,
  children: null,
}

export default Button
