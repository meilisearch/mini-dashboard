import styled from 'styled-components'
import { space, layout, color, compose, flexbox, position } from 'styled-system'
import { props as stprops } from '@styled-system/should-forward-prop'

const regex = new RegExp(`^(${stprops.join('|')})$`)

const shouldForwardProp = (prop) => !regex.test(prop)

const Box = styled('div').withConfig({ shouldForwardProp })`
  box-sizing: border-box;
  min-width: 0;

  && {
    ${compose(space, layout, color, flexbox, position)}
  }
`
export default Box
