import React from 'react'
import EmptyView from 'components/EmptyView'
import Typography from 'components/Typography'

const NoResultForRequest = () => (
  <EmptyView buttonLink="https://docs.meilisearch.com/reference/api/search.html">
    <Typography
      variant="typo8"
      style={{ textAlign: 'center' }}
      mb={16}
      color="gray.0"
    >
      Sorry mate, no results matching your request
    </Typography>
    <Typography variant="typo8" style={{ textAlign: 'center' }} mb={56}>
      <span role="img" aria-label="sad">
        ☹️
      </span>
    </Typography>
  </EmptyView>
)

export default NoResultForRequest
