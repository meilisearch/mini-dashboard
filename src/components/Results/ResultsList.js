/* eslint-disable no-unused-vars */
import React from 'react'
import { connectStateResults } from 'react-instantsearch-dom'

import InfiniteHits from './InfiniteHits'

const ResultsList = connectStateResults(({ searchResults, searching }) => {
  const hasResults = searchResults && searchResults.nbHits !== 0
  // if (searching) return <div>loading</div>
  // if (!searching && hasResults) return <InfiniteHits hitComponent={Hit} />
  // return <div>No results</div>

  return <InfiniteHits />
})

export default ResultsList
