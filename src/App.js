import React from 'react'
import styled from 'styled-components'
import { InstantSearch } from 'react-instantsearch-dom'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

import useLocalStorage from 'hooks/useLocalStorage'
import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import Results from 'components/Results'

// For development purpose. Remove and decomment the following line in production
const baseUrl = 'http://127.0.0.1:7700'
// const baseUrl = window.location.origin

const Wrapper = styled.div`
  background-color: ${(p) => p.theme.colors.gray[11]};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const App = () => {
  const [apiKey, setApiKey] = useLocalStorage('apiKey')
  const [searchClient, setSearchClient] = React.useState(
    instantMeiliSearch(baseUrl, apiKey)
  )

  React.useEffect(() => {
    setSearchClient(instantMeiliSearch(baseUrl, apiKey, { primaryKey: 'id' }))
  }, [apiKey])

  return (
    <Wrapper>
      <InstantSearch indexName="movies" searchClient={searchClient}>
        <Header setApiKey={setApiKey} />
        <div
          style={{
            display: 'flex',
            flex: 1,
            height: 'calc(100vh - 120px)',
            overflow: 'hidden',
          }}
        >
          <Sidebar />
          <Results />
        </div>
      </InstantSearch>
    </Wrapper>
  )
}

export default App
