import React from 'react'
import styled from 'styled-components'
import {
  Stats,
  InfiniteHits,
  Highlight,
  connectStateResults,
} from 'react-instantsearch-dom'

const Wrapper = styled.div`
  flex: 1;
  padding: ${(p) => p.theme.space[4]}px;
  overflow: auto;
`

function Hit({ hit }) {
  return <Highlight attribute="title" hit={hit} key={hit.id} />
}

const ResultsList = connectStateResults(({ searchResults }) => {
  const hasResults = searchResults && searchResults.nbHits !== 0
  // eslint-disable-next-line no-console
  console.log(hasResults)
  return <InfiniteHits hitComponent={Hit} />
})

const Results = () => (
  <Wrapper>
    <Stats />
    <ResultsList />
  </Wrapper>
)

export default Results
