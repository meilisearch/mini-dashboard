import React from 'react'

import Box from 'components//Box'
import MSLogo from 'components/icons/MSLogo'
import Search from 'components/icons/Search'

export default {
  title: 'Components/Icons',
}

export const MeilisearchLogo = () => (
  <Box>
    <MSLogo size={64} />
  </Box>
)

export const SearchIcon = () => (
  <Box>
    <Search size={64} />
  </Box>
)
