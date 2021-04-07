import React from 'react'

import Box from 'components/Box'
import Typography from 'components/Typography'
import Button from 'components/Button'

const NoSelectOption = () => (
  <Box
    py={3}
    px={24}
    backgroundColor="white"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
  >
    <Typography variant="typo4" color="gray.6" mb={3}>
      no index found
    </Typography>
    <Button
      variant="bordered"
      size="small"
      as="a"
      href="https://docs.meilisearch.com/reference/api/indexes.html"
      target="_blank"
      style={{ textDecoration: 'none' }}
    >
      Need help ?
    </Button>
  </Box>
)

export default NoSelectOption
