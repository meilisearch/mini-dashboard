import styled from 'styled-components'
import { space, layout, color, compose, flexbox, position } from 'styled-system'

const Box = styled.div(compose(space, layout, color, flexbox, position))

export default Box
