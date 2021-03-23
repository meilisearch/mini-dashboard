import React from 'react'
import styled, { css } from 'styled-components'

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
}

const StyledTypography = styled.span`
  ${(p) => variants[p.$variant].style};
`

const Typography = ({ variant = 'default', children, ...props }) => {
  const { tag = 'span', style = css`` } = variants[variant]
  return (
    <StyledTypography as={tag} {...style} {...props} $variant={variant}>
      {children}
    </StyledTypography>
  )
}

export default Typography
