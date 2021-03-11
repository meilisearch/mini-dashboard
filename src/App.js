import React from 'react'
import {
  InstantSearch,
  SearchBox,
  Highlight,
  InfiniteHits,
  createInfiniteHitsSessionStorageCache,
} from 'react-instantsearch-dom'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { ThemeProvider } from 'styled-components'

import theme from './theme'
import GlobalStyle from './GlobalStyle'
import Header from './components/Header'

// For development purpose. Remove and decomment the following line in production
const baseUrl = 'http://127.0.0.1:7700'
// const baseUrl = window.location.origin
const searchClient = instantMeiliSearch(baseUrl)

function Hit({ hit }) {
  return <Highlight attribute="title" hit={hit} key={hit.id} />
}

const App = () => {
  const sessionStorageCache = createInfiniteHitsSessionStorageCache()

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <InstantSearch indexName="movies" searchClient={searchClient}>
        <SearchBox />
        <InfiniteHits hitComponent={Hit} cache={sessionStorageCache} />
      </InstantSearch>
    </ThemeProvider>
  )
}

export default App
