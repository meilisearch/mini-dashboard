import React from 'react'
import styled from 'styled-components'
import Color from 'color'
import PropTypes from 'prop-types'

import Clear from 'components/icons/clear-input.svg'

const InputField = styled.input`
  height: 48px;
  width: 100%;
  padding-left: ${(p) => (p.$hasIcon ? '48px' : '8px')};
  padding-right: 8px;
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

  ::-webkit-search-cancel-button {
    -webkit-appearance: none;
    width: 11px;
    height: 11px;
    background-image: url(${Clear});
    background-repeat: no-repeat;
  }
`

const InputContainer = styled.div`
  position: relative;
  width: 100%;

  svg {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
  }
`

const Input = ({ icon, ref, ...props }) => (
  <InputContainer style={{ position: 'relative', width: '100%' }}>
    {icon}
    <InputField ref={ref} $hasIcon={icon} {...props} />
  </InputContainer>
)

export default Input

Input.propTypes = {
  /**
   * Icon you want to appear inside the input, on the left
   */
  icon: PropTypes.node,
}

Input.defaultProps = {
  icon: null,
}
