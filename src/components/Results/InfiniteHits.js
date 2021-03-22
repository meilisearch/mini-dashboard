import React from 'react'
import styled from 'styled-components'
import { connectInfiniteHits } from 'react-instantsearch-dom'

import Hit from './Hit'

const HitsList = styled.ul`
  padding: 0;
  > li + li {
    margin-top: 16px;
  }
`

const InfiniteHits = connectInfiniteHits(({ hits, hasMore, refineNext }) => (
  <div>
    <HitsList>
      {hits.map((hit, index) => (
        <Hit key={index} hit={hit} />
      ))}
    </HitsList>
    <button disabled={!hasMore} onClick={refineNext} type="button">
      Show more
    </button>
  </div>
))

export default InfiniteHits
