import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'
import Box from 'components/Box'

const EmptyView = ({ buttonLink, children, ...props }) => (
  <Box
    display="flex"
    height="100%"
    alignItems="center"
    flexDirection="column"
    justifyContent="center"
    maxWidth={264}
    m="auto"
    {...props}
  >
    {children}
    <Button
      as="a"
      target="_blank"
      href={buttonLink}
      variant="bordered"
      size="small"
      style={{ textDecoration: 'none', width: 'auto' }}
    >
      Need help ?
    </Button>
  </Box>
)

EmptyView.propTypes = {
  /**
   * External link
   */
  buttonLink: PropTypes.string,
  /**
   * Children to be displayed
   */
  children: PropTypes.node,
}

EmptyView.defaultProps = {
  buttonLink: null,
  children: null,
}

export default EmptyView
