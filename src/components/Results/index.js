/* eslint-disable no-unused-vars */
import React from 'react'
import { useStats, useInstantSearch } from 'react-instantsearch'
import Box from 'components/Box'
import Stats from 'components/Stats'
import InfiniteHits from './InfiniteHits'
import NoResultForRequest from './NoResultForRequest'

const ConnectedStats = (props) => {
  const statsApi = useStats(props)
  return <Stats {...statsApi} />
}

const Results = () => {
  const { results } = useInstantSearch()
  const hasResults = !!results && results?.nbHits !== 0

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={56}
      >
        <div>
          <ConnectedStats nbResults={results?.hits.length} />
        </div>
      </Box>
      {hasResults ? <InfiniteHits /> : <NoResultForRequest />}
    </>
  )
}

export default Results
