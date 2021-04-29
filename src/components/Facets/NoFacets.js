import React from 'react'

import Box from 'components/Box'
import EmptyView from 'components/EmptyView'
import Typography from 'components/Typography'

const NoFacets = () => (
  <Box height="100%">
    <EmptyView>
      <Typography variant="typo4" color="gray.6" mb={16}>
        No facet found
      </Typography>
    </EmptyView>
  </Box>
)

export default NoFacets
