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
import { MeiliSearch } from 'meilisearch'

export const baseUrl =
  process.env.REACT_APP_MEILI_SERVER_ADDRESS ||
  (process.env.NODE_ENV === 'development'
    ? 'http://0.0.0.0:7700'
    : window.location.origin)

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

const NoMeiliSearchRunning = () => (
  <EmptyView buttonLink="https://docs.meilisearch.com/learn/getting_started/quick_start.html">
    <Typography
      variant="typo8"
      style={{ textAlign: 'center' }}
      mb={3}
      color="gray.0"
    >
      It seems like MeiliSearch isn’t running, did you forget to start it?
    </Typography>
    <Typography
      variant="typo8"
      style={{ textAlign: 'center' }}
      mb={32}
      color="gray.2"
    >
      (Don’t forget to set an API Key if you want one)
    </Typography>
    <Typography
      variant="typo8"
      style={{ textAlign: 'center', fontSize: 40 }}
      mb={56}
    >
      <span role="img" aria-label="face-with-monocle">
        🧐
      </span>
    </Typography>
  </EmptyView>
)

const App = () => {
  const [apiKey, setApiKey] = useLocalStorage('apiKey')
  // eslint-disable-next-line no-unused-vars
  const [indexes, setIndexes] = React.useState()
  const [isMeiliSearchRunning, setIsMeiliSearchRunning] = React.useState(true)
  const [requireApiKeyToWork, setRequireApiKeyToWork] = React.useState(false)
  const [currentIndex, setCurrentIndex] = useLocalStorage('currentIndex')
  const [ISClient, setISClient] = React.useState(
    instantMeiliSearch(baseUrl, apiKey, {
      primaryKey: 'id',
      paginationTotalHits: 50,
    })
  )
  const [MSClient, setMSClient] = React.useState(
    new MeiliSearch({ host: baseUrl, apiKey })
  )
  const dialog = useDialogState({ animated: true, visible: false })

  const getIndexesList = async () => {
    try {
      const res = await MSClient.getStats()
      const array = Object.entries(res.indexes)
      const options = array
        .reduce((prev, curr) => {
          const currentOption = { uid: curr[0], stats: curr[1] }
          return [...prev, currentOption]
        }, [])
        .sort((a, b) => a.uid.localeCompare(b.uid))

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
      setCurrentIndex(null)
      console.log(error)
    }
  }

  React.useEffect(() => {
    // Check if an API key is required / a masterKey was set
    const fetchWithoutApiKey = async () => {
      try {
        const tempClient = new MeiliSearch({ host: baseUrl })
        await tempClient.getIndexes()
      } catch (err) {
        console.log(err)
        if (err.code === 'missing_authorization_header') {
          setRequireApiKeyToWork(true)
        } else {
          setIsMeiliSearchRunning(await MSClient.isHealthy())
        }
      }
    }

    fetchWithoutApiKey()
    getIndexesList()
  }, [])

  // Check if a modal asking for API Key should be displayed
  React.useEffect(() => {
    const shouldDisplayModal = async () => {
      try {
        await MSClient.getIndexes()
      } catch (err) {
        console.log(err)
        dialog.show()
      }
    }
    if (requireApiKeyToWork) shouldDisplayModal()
  }, [requireApiKeyToWork])

  // Get the list of indexes
  React.useEffect(() => {
    getIndexesList()
  }, [MSClient, currentIndex?.uid])

  return (
    <ClientContext.Provider
      value={{ ISClient, MSClient, setISClient, setMSClient }}
    >
      <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
        <Wrapper>
          <InstantSearch
            indexName={currentIndex ? currentIndex.uid : ''}
            searchClient={ISClient}
          >
            <Header
              indexes={indexes}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              requireApiKeyToWork={requireApiKeyToWork}
              client={MSClient}
              refreshIndexes={getIndexesList}
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
                {isMeiliSearchRunning ? (
                  <Content currentIndex={currentIndex} />
                ) : (
                  <NoMeiliSearchRunning />
                )}
              </Box>
            </Body>
          </InstantSearch>
          <Modal
            title={`Enter your private API key${
              requireApiKeyToWork ? '' : ' (facultative)'
            }`}
            dialog={dialog}
            ariaLabel="ask-for-api-key"
          >
            <ApiKeyModalContent closeModal={() => dialog.hide()} />
          </Modal>
        </Wrapper>
      </ApiKeyContext.Provider>
    </ClientContext.Provider>
  )
}

export default App
