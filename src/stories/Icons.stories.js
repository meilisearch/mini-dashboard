import React from 'react'

import Box from 'components//Box'
import MSLogo from 'components/icons/MSLogo'
import ArrowDownIcon from 'components/icons/ArrowDown'
import CloseIcon from 'components/icons/Close'
import DocumentIcon from 'components/icons/Document'
import IndexesIcon from 'components/icons/Indexes'
import KeyIcon from 'components/icons/Key'
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

export const ArrowDown = () => (
  <Box>
    <ArrowDownIcon width={34} height={36} />
  </Box>
)

export const Close = () => (
  <Box>
    <CloseIcon width={34} height={36} />
  </Box>
)

export const Document = () => (
  <Box>
    <DocumentIcon width={40} height={46} />
  </Box>
)

export const Indexes = () => (
  <Box>
    <IndexesIcon width={42} height={46} />
  </Box>
)

export const Key = () => (
  <Box>
    <KeyIcon size={40} />
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
