import React from 'react'
import styled from 'styled-components'
import { useArtists } from 'context/ArtistsContext'
import { connectInfiniteHits, Configure } from 'react-instantsearch-dom'

import Button from 'components/Button'
import ScrollToTop from 'components/ScrollToTop'

import Hit from './Hit'
import ArtistHits from './ArtistHits'

const HitsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;

  > li {
    width: calc((100% - 2 * 16px) / 3);
    margin-bottom: 16px;
  }
`

const InfiniteHits = connectInfiniteHits(({ hits, hasMore, refineNext }) => {
  const { artists } = useArtists()

  return (
    <div>
      <Configure hitsPerPage={21} />
      <HitsList>
        {hits.map((hit, index) => {
          if (index === 2) {
            return (
              <>
                <ArtistHits
                  key={`artists-${index}`}
                  hits={artists}
                  index={index}
                />
                <Hit key={hit.id} hit={hit} />
              </>
            )
          }
          return <Hit key={hit.id} hit={hit} />
        })}
      </HitsList>
      {hasMore && (
        <Button
          size="small"
          variant="bordered"
          onClick={refineNext}
          style={{ margin: '0 auto', marginTop: 32 }}
        >
          Load more
        </Button>
      )}
      <ScrollToTop />
    </div>
  )
})

export default InfiniteHits
