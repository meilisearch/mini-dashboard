import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { space } from 'styled-system'

const variants = {
  default: {
    tag: 'span',
    style: css``,
  },
  filters: {
    tag: 'span',
    style: css`
      font-family: Barlow;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 22px;
      color: ${(p) => p.theme.colors.gray[3]};
    `,
  },
  h3: {
    tag: 'h3',
    style: css`
      font-size: 22px;
      line-height: 22px;
      font-style: normal;
      font-weight: 500;
      margin: 0;
    `,
  },
  hitKey: {
    tag: 'span',
    style: css`
      font-size: 12px;
      font-weight: 500;
      line-height: 22px;
      text-transform: uppercase;
      color: ${(p) => p.theme.colors.gray[5]};
    `,
  },
  hitValue: {
    tag: 'span',
    style: css`
      font-size: 15px;
      font-weight: 400;
      line-height: 22px;
      color: ${(p) => p.theme.colors.gray[2]};
    `,
  },
  info: {
    tag: 'span',
    style: css`
      font-size: 15px;
      line-height: 22px;
      font-weight: 400;
      display: block;
      color: ${(p) => p.theme.colors.gray[6]};
    `,
  },
  danger: {
    tag: 'span',
    style: css`
      font-size: 15px;
      font-weight: 400;
      line-height: 22px;
      display: block;
      color: ${(p) => p.theme.colors.main.default};
    `,
  },
}

const StyledTypography = styled.span`
  ${(p) => p.$variant.style};
  ${space};
`

const Typography = ({ variant = 'default', children, ...props }) => {
  const safeVariant = variants[variant] || variants.default
  const { tag = 'span', style = css`` } = safeVariant
  return (
    <StyledTypography as={tag} {...style} $variant={safeVariant} {...props}>
      {children}
    </StyledTypography>
  )
}

Typography.propTypes = {
  /**
   * Text's variant
   */
  variant: PropTypes.string,
  /**
   * Text to be displayed
   */
  children: PropTypes.node,
}

Typography.defaultProps = {
  variant: 'default',
  children: null,
}

export default Typography
