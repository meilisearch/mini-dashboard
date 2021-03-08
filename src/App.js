import React from 'react'
import {
    InstantSearch,
    SearchBox,
    Highlight,
    InfiniteHits,
    createInfiniteHitsSessionStorageCache,
} from 'react-instantsearch-dom'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

// For development purpose. Remove and decomment the following line in production
const baseUrl = 'http://127.0.0.1:7700'
// const baseUrl = window.location.origin
const searchClient = instantMeiliSearch(baseUrl)

const App = () => {
    const sessionStorageCache = createInfiniteHitsSessionStorageCache()

    return (
        <InstantSearch indexName="movies" searchClient={searchClient}>
            <SearchBox />
            <InfiniteHits hitComponent={Hit} cache={sessionStorageCache} />
        </InstantSearch>
    )
}

function Hit({ hit }) {
    // return <p key={hit}>{hit.title}</p>
    return <Highlight attribute="title" hit={hit} key={hit.id} />
}

export default App
