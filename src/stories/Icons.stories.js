import React from 'react'

import Box from 'components//Box'
import MSLogo from 'components/icons/MSLogo'
import DocumentIcon from 'components/icons/Document'
import PictureIcon from 'components/icons/Picture'
import SearchIcon from 'components/icons/Search'

export default {
  title: 'Components/Icons',
}

export const MeilisearchLogo = () => (
  <Box>
    <MSLogo size={64} />
  </Box>
)

export const Document = () => (
  <Box>
    <DocumentIcon width={40} height={46} />
  </Box>
)

export const Picture = () => (
  <Box>
    <PictureIcon width={40} height={46} />
  </Box>
)

export const Search = () => (
  <Box>
    <SearchIcon size={64} />
  </Box>
)
