import React from 'react'
import styled from 'styled-components'
import { InstantSearch } from 'react-instantsearch-dom'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

import useLocalStorage from 'hooks/useLocalStorage'
import Header from 'components/Header'
// import Sidebar from 'components/Sidebar'
import Results from 'components/Results'
import Modal from 'components/Modal'

const baseUrl = 'http://127.0.0.1:7700'

const Wrapper = styled.div`
  background-color: ${(p) => p.theme.colors.gray[11]};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Body = styled.div`
  display: flex;
  flex: 1;
  height: calc(100vh - 120px);
  overflow: hidden;
`

const RequestForAnApiKey = ({ setApiKey }) => (
  <Modal visible>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <label htmlFor="apiKey">
        Please provide an API key :
        <input
          style={{ display: 'block' }}
          id="apiKey"
          type="text"
          onChange={(e) => setApiKey(e.target.value)}
        />
      </label>
    </div>
  </Modal>
)

const App = () => {
  const [apiKey, setApiKey] = useLocalStorage('apiKey')
  const [indexes, setIndexes] = React.useState()
  const [currentIndex, setCurrentIndex] = React.useState()
  const [searchClient, setSearchClient] = React.useState(
    instantMeiliSearch(baseUrl, apiKey, { primaryKey: 'id' })
  )
  const [requestApiKey, setRequestApiKey] = React.useState(false)

  const getIndexesList = async () => {
    if (searchClient) {
      try {
        const res = await searchClient.client.listIndexes()
        setIndexes(res)
        setCurrentIndex(res[0])
        setRequestApiKey(false)
      } catch (error) {
        if (error.type === 'MeiliSearchCommunicationError') {
          const status = await searchClient.client.isHealthy()
          if (status) {
            setRequestApiKey(true)
          } else {
            console.log(error)
          }
        }
        console.log(error)
      }
    }
  }

  const setClient = () => {
    try {
      const client = instantMeiliSearch(baseUrl, apiKey, { primaryKey: 'id' })
      setSearchClient(client)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getIndexesList()
  }, [searchClient])

  React.useEffect(() => {
    setClient()
  }, [apiKey])

  return (
    <Wrapper>
      <InstantSearch
        indexName={currentIndex ? currentIndex.uid : ''}
        searchClient={searchClient}
      >
        <Header
          apiKey={apiKey}
          setApiKey={setApiKey}
          indexes={indexes}
          setCurrentIndex={setCurrentIndex}
        />
        <Body>
          {/* <Sidebar /> */}
          <Results />
        </Body>
      </InstantSearch>
      {requestApiKey && <RequestForAnApiKey setApiKey={setApiKey} />}
    </Wrapper>
  )
}

export default App
