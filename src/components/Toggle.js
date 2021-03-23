import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Color from 'color'
import { Checkbox } from 'reakit/Checkbox'

const Label = styled.label`
  width: 200px;
  height: 40px;
  background-color: ${(p) => p.theme.colors.gray[10]};
  border-radius: 60px;
  display: flex;
  align-items: center;
  position: relative;
`

const Input = styled(Checkbox)`
  width: 98px;
  height: 32px;
  margin: 0;
  background-color: white;
  border-radius: 60px;
  position: absolute;
  top: 4px;
  transform: translate(4px);
  transition: transform 300ms;
  &[aria-checked='false'] {
    transform: translate(98px);
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    border-radius: 60px;
    box-shadow: 0px 4px 6px ${(p) => Color(p.theme.colors.gray[0]).alpha(0.11)};
  }
  &:focus {
    outline: none;
    &:before {
      box-shadow: 0px 0px 12px
        ${(p) => Color(p.theme.colors.gray[0]).alpha(0.2)};
    }
  }
`

const Span = styled.span`
  height: 100%;

  width: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  &: hover {
    cursor: pointer;
  }
  transition: color 300ms;
  &:hover {
    color: ${(p) => p.theme.colors.gray[0]};
  }
  color: ${(p) =>
    p.checked ? p.theme.colors.gray[0] : p.theme.colors.gray[5]};
`

const Toggle = ({
  onLabel = 'On',
  offLabel = 'Off',
  ariaLabel,
  onChange,
  ...props
}) => {
  const [checked, setChecked] = React.useState(true)
  const toggle = () => setChecked(!checked)

  return (
    <Label {...props}>
      <Input
        checked={checked}
        onChange={(e) => {
          toggle()
          onChange(e)
        }}
        aria-label={ariaLabel}
      />
      <Span checked={checked}>{onLabel}</Span>
      <Span checked={!checked}>{offLabel}</Span>
    </Label>
  )
}

Toggle.propTypes = {
  /**
   * Text displayed when toggle is on
   */
  onLabel: PropTypes.element,
  /**
   * Text displayed when toggle is off
   */
  offLabel: PropTypes.element,
  /**
   * Aria-label for toggler
   */
  ariaLabel: PropTypes.string,
  /**
   * Function to run when a change occurs
   */
  onChange: PropTypes.func,
}

Toggle.defaultProps = {
  onLabel: 'On',
  offLabel: 'Off',
  ariaLabel: null,
  onChange: null,
}

export default Toggle
