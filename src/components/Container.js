import PropTypes from 'prop-types'
import styled from 'styled-components'
import Box from 'components/Box'

const Container = styled(Box)`
  max-width: ${(p) => p.theme.breakpoints.large}px;
  width: 100%;
  margin: auto;
`

Container.propTypes = {
  /**
   * Container contents
   */
  children: PropTypes.node,
}

Container.defaultProps = {
  children: null,
}

export default Container
