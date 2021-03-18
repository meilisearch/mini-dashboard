import React from 'react'
import styled from 'styled-components'
import Color from 'color'

import Search from 'components/icons/Search'

const Wrapper = styled.span`
  position: relative;
`

const Icon = styled(Search)`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
`

const InputField = styled.input`
  width: 472px;
  height: 48px;
  padding-left: 48px;
  background-position: top 50% left 16px;
  border-color: ${(p) => p.theme.colors.gray[10]};
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  box-shadow: 0px 4px 6px ${Color('#000').alpha(0.04)};
  transition: border-color 300ms;
  outline: none;
  color: ${(p) => p.theme.colors.gray[0]};
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;

  ::placeholder {
    color: ${(p) => p.theme.colors.gray[7]};
  }

  &:hover {
    border-color: ${(p) => p.theme.colors.gray[8]};
  }

  &:focus {
    border-color: ${(p) => p.theme.colors.gray[6]};
    svg {
      fill: ${(p) => p.theme.colors.gray[6]};
    }
  }
`

const Input = (props) => (
  <Wrapper>
    <Icon size={16} />
    <InputField {...props} />
  </Wrapper>
)

export default Input
