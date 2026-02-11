import React from 'react'
import styled from 'styled-components'
import { Checkbox as ReakitCheckbox } from 'reakit/Checkbox'

const StyledCheckbox = styled(ReakitCheckbox)`
  appearance: none;
  position: relative;
  border-radius: 4px;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border-width: 2px;
  border-style: solid;
  border-color: ${(p) => p.theme.colors.gray[7]};
  background-color: white;
  outline: none;
  cursor: pointer;
  transition:
    background-color 300ms,
    border-color 300ms;

  &[aria-checked='true'] {
    color: white;
    border-color: ${(p) => p.theme.colors.main.default};
    background-color: ${(p) => p.theme.colors.main.default};
    &:before {
      content: '✔';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 10px;
    }
  }
`

const Label = styled.label`
  transition: color 300ms;
  cursor: pointer;
  outline: none;
`
const Container = styled.div`
  color: ${(p) => p.theme.colors.gray[3]};

  display: flex;
  align-items: center;
  &:hover {
    color: ${(p) => p.theme.colors.gray[0]};
  }

  ${StyledCheckbox}:focus + ${Label} {
    color: ${(p) => p.theme.colors.gray[0]};
  }
`

const Checkbox = ({
  children,
  checked,
  onChange,
  label = 'checkbox',
  ...props
}) => (
  <Container {...props}>
    <StyledCheckbox checked={checked} onChange={onChange} id={label} />
    <Label htmlFor={label}>{children}</Label>
  </Container>
)

export default Checkbox
