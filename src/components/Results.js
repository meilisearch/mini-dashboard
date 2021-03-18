/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components'
import {
  Stats,
  InfiniteHits,
  // Highlight,
  connectStateResults,
  connectHighlight,
} from 'react-instantsearch-dom'

const Wrapper = styled.div`
  flex: 1;
  padding: ${(p) => p.theme.space[4]}px;
  overflow: auto;
`

const Highlight = ({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  })

  return (
    <span>
      {parsedHit.map((part, index) =>
        part.isHighlighted ? (
          <mark key={index}>{part.value}</mark>
        ) : (
          <span key={index}>{part.value}</span>
        )
      )}
    </span>
  )
}

const CustomHighlight = connectHighlight(Highlight)

function Hit({ hit }) {
  const objectArray = Object.entries(hit._highlightResult)

  return (
    <>
      {/* {console.log({ objectArray })} */}
      {objectArray.map(([key, value]) => (
        <div style={{ display: 'flex' }} key={key}>
          <div style={{ fontWeight: 'bold', width: 150 }}>{`${key} : `}</div>
          <CustomHighlight attribute={key} hit={hit} />
          {/* <div>
            {typeof value !== 'string' ? JSON.stringify(value, null, 2) : value}
          </div> */}
        </div>
      ))}
    </>
  )
}

const ResultsList = connectStateResults(({ searchResults, searching }) => {
  const hasResults = searchResults && searchResults.nbHits !== 0
  // if (searching) return <div>loading</div>
  // if (!searching && hasResults) return <InfiniteHits hitComponent={Hit} />
  // return <div>No results</div>

  return <InfiniteHits hitComponent={Hit} />
})

const Results = () => (
  <Wrapper>
    <Stats />
    <ResultsList />
  </Wrapper>
)

export default Results
