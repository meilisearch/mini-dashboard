/* eslint-disable no-console */
import React from 'react'
import styled from 'styled-components'
import { InstantSearch } from 'react-instantsearch-dom'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { useDialogState } from 'reakit/Dialog'

import useLocalStorage from 'hooks/useLocalStorage'
import ApiKeyModalContent from 'components/ApiKeyModalContent'
import Box from 'components/Box'
import EmptyView from 'components/EmptyView'
import Header from 'components/Header/index'
// import Sidebar from 'components/Sidebar'
import Modal from 'components/Modal'
import OnBoarding from 'components/OnBoarding'
import Results from 'components/Results'
import ApiKeyContext from 'context/ApiKeyContext'
import ClientContext from 'context/ClientContext'
import Typography from 'components/Typography'

export const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:7700'
    : window.location.origin

const Wrapper = styled.div`
  background-color: ${(p) => p.theme.colors.gray[11]};
  min-height: 100vh;
`

const Body = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  min-height: calc(100vh - 120px);
`

const Content = ({ currentIndex }) => {
  if (!currentIndex) return <OnBoarding />
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

const App = () => {
  const [apiKey, setApiKey] = useLocalStorage('apiKey')
  // eslint-disable-next-line no-unused-vars
  const [indexes, setIndexes] = React.useState()
  const [isApiKeyRequired, setIsApiKeyRequired] = React.useState(false)
  const [currentIndex, setCurrentIndex] = useLocalStorage('currentIndex')
  const [client, setClient] = React.useState(
    instantMeiliSearch(baseUrl, apiKey, { primaryKey: 'id' })
  )
  const dialog = useDialogState({ animated: true, visible: false })

  const getIndexesList = async () => {
    try {
      const res = await client.client.stats()
      const array = Object.entries(res.indexes)
      const options = array.reduce((prev, curr) => {
        const currentOption = { uid: curr[0], stats: curr[1] }
        return [...prev, currentOption]
      }, [])

      setIndexes(options)
      if (options.length) {
        if (currentIndex) {
          setCurrentIndex(
            options.find((option) => option.uid === currentIndex.uid)
          )
        } else {
          setCurrentIndex(options[0])
        }
      } else {
        setCurrentIndex(null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Check if an API key is required / a masterKey was set
  React.useEffect(() => {
    const fetchWithoutApiKey = async () => {
      try {
        const cl = instantMeiliSearch(baseUrl, apiKey)
        await cl.client.listIndexes()
      } catch (err) {
        console.log(err)
        setIsApiKeyRequired(true)
        dialog.show()
      }
    }
    fetchWithoutApiKey()
    getIndexesList()
  }, [])

  // Get the list of indexes
  React.useEffect(() => {
    getIndexesList()
  }, [client])

  return (
    <ClientContext.Provider value={{ client, setClient }}>
      <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
        <Wrapper>
          <InstantSearch
            indexName={currentIndex ? currentIndex.uid : ''}
            searchClient={client}
          >
            <Header
              indexes={indexes}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              isApiKeyRequired={isApiKeyRequired}
            />
            <Body>
              {/* <Sidebar /> */}
              <Box
                width={928}
                m="0 auto"
                py={4}
                display="flex"
                flexDirection="column"
              >
                <Content currentIndex={currentIndex} />
              </Box>
            </Body>
          </InstantSearch>
          {dialog.visible && (
            <Modal
              title={`Enter your private API key${
                isApiKeyRequired ? '' : ' (facultative)'
              }`}
              closable={false}
              dialog={dialog}
            >
              <ApiKeyModalContent closeModal={() => dialog.hide()} />
            </Modal>
          )}
        </Wrapper>
      </ApiKeyContext.Provider>
    </ClientContext.Provider>
  )
}

export default App
