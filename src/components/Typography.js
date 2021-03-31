import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { space, color } from 'styled-system'

const variants = {
  default: {
    tag: 'span',
    style: css``,
  },
  typo1: {
    tag: 'h2',
    style: css`
      font-size: 22px;
      line-height: 22px;
      font-weight: 500;
      margin: 0;
    `,
  },
  typo2: {
    tag: 'span',
    style: css`
      font-family: Barlow;
      font-size: 15px;
      line-height: 22px;
      font-weight: 500;
    `,
  },
  typo3: {
    tag: 'span',
    style: css`
      font-size: 13px;
      line-height: 19px;
      font-weight: 500;
    `,
  },
  typo4: {
    tag: 'span',
    style: css`
      font-size: 16px;
      line-height: 22px;
      font-weight: 500;
    `,
  },
  typo5: {
    tag: 'span',
    style: css`
      font-size: 14px;
      line-height: 22px;
      font-weight: 500;
    `,
  },
  typo6: {
    tag: 'span',
    style: css`
      font-size: 12px;
      line-height: 22px;
      font-weight: 400;
      letter-spacing: 0.03em;
    `,
  },
  typo7: {
    tag: 'span',
    style: css`
      font-size: 16px;
      line-height: 22px;
      font-weight: 500;
      letter-spacing: 1px;
    `,
  },
  typo8: {
    tag: 'span',
    style: css`
      font-size: 18px;
      line-height: 25px;
      font-weight: 400;
    `,
  },
  typo9: {
    tag: 'span',
    style: css`
      font-size: 25px;
      line-height: 22px;
      font-weight: 400;
    `,
  },
  typo10: {
    tag: 'span',
    style: css`
      font-size: 12px;
      font-weight: 500;
      line-height: 22px;
      text-transform: uppercase;
    `,
  },
  typo11: {
    tag: 'span',
    style: css`
      font-size: 15px;
      font-weight: 400;
      line-height: 22px;
      display: inline-block;
    `,
  },
  typo12: {
    tag: 'span',
    style: css`
      font-size: 46px;
      line-height: 54px;
      font-weight: 300;
    `,
  },
  typo13: {
    tag: 'span',
    style: css`
      font-size: 26px;
      line-height: 30px;
      font-weight: 500;
    `,
  },
}

const StyledTypography = styled.span`
  ${(p) => p.$variant.style};
  ${space};
  ${color};
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
  variant: PropTypes.oneOf([
    'default',
    'typo1',
    'typo2',
    'typo3',
    'typo4',
    'typo5',
    'typo6',
    'typo7',
    'typo8',
    'typo9',
    'typo10',
    'typo11',
    'typo12',
    'typo13',
  ]),
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
