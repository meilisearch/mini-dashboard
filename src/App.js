/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { InstantSearch } from 'react-instantsearch-dom'
import { instantMeiliSearch as instantMeilisearch } from '@meilisearch/instant-meilisearch'
import { useDialogState } from 'reakit/Dialog'
import { MeiliSearch as Meilisearch } from 'meilisearch'

import ApiKeyContext from 'context/ApiKeyContext'
import { useMeilisearchClientContext } from 'context/MeilisearchClientContext'
import useLocalStorage from 'hooks/useLocalStorage'
import ApiKeyModalContent from 'components/ApiKeyModalContent'
import Box from 'components/Box'
import EmptyView from 'components/EmptyView'
import Header from 'components/Header/index'
import CloudBanner from 'components/CloudBanner'
import Modal from 'components/Modal'
import OnBoarding from 'components/OnBoarding'
import NoMeilisearchRunning from 'components/NoMeilisearchRunning'
import Results from 'components/Results'
import Typography from 'components/Typography'
import ApiKeyAwarenessBanner from 'components/ApiKeyAwarenessBanner'
import clientAgents from './version/client-agents'

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

const App = () => {
  const [apiKey, setApiKey] = useLocalStorage('apiKey')
  const [indexes, setIndexes] = useState()
  const [isMeilisearchRunning, setIsMeilisearchRunning] = useState(true)
  const [requireApiKeyToWork, setRequireApiKeyToWork] = useState(false)
  const [currentIndex, setCurrentIndex] = useLocalStorage('currentIndex')
  const [showCloudBanner, setShowCloudBanner] = useState(true)
  const [isApiKeyBannerVisible, setIsApiKeyBannerVisible] = useState(false)
  const dialog = useDialogState({ animated: true, visible: false })

  const {
    meilisearchJsClient,
    setMeilisearchJsClient,
    instantMeilisearchClient,
    setInstantMeilisearchClient,
  } = useMeilisearchClientContext()

  const handleBannerClose = () => {
    setIsApiKeyBannerVisible(false)
  }

  const getIndexesList = async () => {
    try {
      const res = await meilisearchJsClient.getStats()
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
        setInstantMeilisearchClient(
          instantMeilisearch(baseUrl, apiKey, {
            primaryKey: 'id',
            clientAgents,
          }).searchClient
        )
      } else {
        setCurrentIndex(null)
      }
    } catch (error) {
      setCurrentIndex(null)
      console.log(error)
    }
  }

  useEffect(() => {
    // Check if the API key is present on the url then put it in the local storage
    const urlParams = new URLSearchParams(window.location.search)
    const apiKeyParam = urlParams.get('api_key')
    const cloudBannerQueryParam = urlParams.get('cloud_banner')

    if (cloudBannerQueryParam === 'false') {
      setShowCloudBanner(false)
    }
    if (apiKeyParam) {
      setApiKey(apiKeyParam)
      setIsApiKeyBannerVisible(true)
    }

    // Check if an API key is required / a masterKey was set
    const fetchWithoutApiKey = async () => {
      try {
        const tempClient = new Meilisearch({ host: baseUrl, clientAgents })
        await tempClient.getIndexes()
      } catch (err) {
        console.log(err)
        if (err.code === 'missing_authorization_header') {
          setRequireApiKeyToWork(true)
        } else {
          setIsMeilisearchRunning(await meilisearchJsClient.isHealthy())
        }
      }
    }

    fetchWithoutApiKey()
    getIndexesList()
  }, [])

  useEffect(() => {
    if (apiKey) {
      setInstantMeilisearchClient(
        instantMeilisearch(baseUrl, apiKey, {
          primaryKey: 'id',
          clientAgents,
        }).searchClient
      )

      setMeilisearchJsClient(
        new Meilisearch({
          host: baseUrl,
          apiKey,
          clientAgents,
        })
      )
    }
  }, [apiKey])

  // Check if a modal asking for API Key should be displayed
  useEffect(() => {
    const shouldDisplayModal = async () => {
      try {
        await meilisearchJsClient.getIndexes()
      } catch (err) {
        console.log(err)
        dialog.show()
      }
    }
    if (requireApiKeyToWork) shouldDisplayModal()
  }, [requireApiKeyToWork])

  // Get the list of indexes
  useEffect(() => {
    getIndexesList()
  }, [meilisearchJsClient, currentIndex?.uid])

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      <Wrapper>
        <InstantSearch
          indexName={currentIndex ? currentIndex.uid : ''}
          searchClient={instantMeilisearchClient}
        >
          {isApiKeyBannerVisible && (
            <ApiKeyAwarenessBanner onClose={handleBannerClose} />
          )}
          {showCloudBanner && <CloudBanner />}
          <Header
            indexes={indexes}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            requireApiKeyToWork={requireApiKeyToWork}
            client={meilisearchJsClient}
            refreshIndexes={getIndexesList}
            isBannerVisible={isApiKeyBannerVisible}
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
              {isMeilisearchRunning ? (
                <Content currentIndex={currentIndex} />
              ) : (
                <NoMeilisearchRunning />
              )}
            </Box>
          </Body>
        </InstantSearch>
        <Modal
          title={`Enter your admin API key${
            requireApiKeyToWork ? '' : ' (optional)'
          }`}
          dialog={dialog}
          ariaLabel="ask-for-api-key"
        >
          <ApiKeyModalContent closeModal={() => dialog.hide()} />
        </Modal>
      </Wrapper>
    </ApiKeyContext.Provider>
  )
}

export default App
