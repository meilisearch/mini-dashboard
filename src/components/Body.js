import React from 'react'
import { InstantSearch } from 'react-instantsearch-dom'

import { useMeilisearchClientContext } from 'context/MeilisearchClientContext'
import { useArtists } from 'context/ArtistsContext'
import Box from 'components/Box'
import Header from 'components/Header/index'
import BodyWrapper from 'components/BodyWrapper'
import EmptyView from 'components/EmptyView'
import Results from 'components/Results'
import Typography from 'components/Typography'

const IndexContent = ({ currentIndex }) => {
  if (currentIndex?.stats?.numberOfDocuments > 0) return <Results />
  return (
    <EmptyView buttonLink="https://docs.meilisearch.com/reference/api/documents.html">
      <Typography
        variant="typo8"
        style={{ textAlign: 'center' }}
        mb={32}
        color="gray.0"
      >
        There’s no document in the selected index
      </Typography>
    </EmptyView>
  )
}

const Body = ({ currentIndex, getIndexesList, setCurrentIndex }) => {
  const { meilisearchJsClient, instantMeilisearchClient } =
    useMeilisearchClientContext()
  const { setArtists } = useArtists()

  return (
    <InstantSearch
      indexName={currentIndex.uid}
      searchClient={instantMeilisearchClient}
      onSearchStateChange={(searchState) => {
        const index = meilisearchJsClient.index('artists')
        const search = index.search(searchState.query, {
          attributesToHighlight: ['artist'],
        })
        search.then((s) => setArtists(s.hits))
      }}
    >
      <Header
        setCurrentIndex={setCurrentIndex}
        client={meilisearchJsClient}
        refreshIndexes={getIndexesList}
      />
      <BodyWrapper>
        <>
          <Box
            width={928}
            m="0 auto"
            py={4}
            display="flex"
            flexDirection="column"
          >
            <IndexContent currentIndex={currentIndex} />
          </Box>
        </>
      </BodyWrapper>
    </InstantSearch>
  )
}

export default Body
