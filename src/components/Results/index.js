/* eslint-disable no-unused-vars */
import React from 'react'
import { connectStateResults, connectStats } from 'react-instantsearch-dom'

import Box from 'components/Box'
import Stats from 'components/Stats'
import InfiniteHits from './InfiniteHits'
import NoResultForRequest from './NoResultForRequest'

const ConnectedStats = connectStats((props) => <Stats {...props} />)

const Results = connectStateResults(({ searchResults }) => {
  const hasResults = !!searchResults && searchResults?.nbHits !== 0

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={56}
      >
        <div>
          <ConnectedStats nbResults={searchResults?.hits.length} />
        </div>
      </Box>
      {hasResults ? <InfiniteHits /> : <NoResultForRequest />}
    </>
  )
})

export default Results
