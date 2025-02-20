/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-console */
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { createGlobalStyle } from 'styled-components'
import { instantMeiliSearch as instantMeilisearch } from '@meilisearch/instant-meilisearch'
import { useDialogState } from 'reakit/Dialog'
import { MeiliSearch as Meilisearch } from 'meilisearch'
import { InstantSearch } from 'react-instantsearch-dom'

import MeilisearchContext from 'context/MeilisearchContext'
import { useMeilisearchClientContext } from 'context/MeilisearchClientContext'
import useLocalStorage from 'hooks/useLocalStorage'
import useMeilisearchApiKey from 'hooks/useMeilisearchApiKey'
import getApiKeyParam from 'utils/getApiKeyParam'
import ApiKeyModalContent from 'components/ApiKeyModalContent'
import Body from 'components/Body'
import Modal from 'components/Modal'
import UnreachableInstance from 'components/UnreachableInstance'
import ApiKeyAwarenessBanner from 'components/ApiKeyAwarenessBanner'
import RightPanel from 'components/RightPanel'
import Header from 'components/Header'
import getIndexesListWithStats from 'utils/getIndexesListWithStats'
import clientAgents from './version/client-agents'

export const MEILISEARCH_HOST =
  process.env.REACT_APP_MEILI_SERVER_ADDRESS ||
  (process.env.NODE_ENV === 'development'
    ? 'http://0.0.0.0:7700'
    : window.location.origin)

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(p) => p.theme.colors.gray[11]};
  }
`

const App = () => {
  const [host, setHost] = useState(MEILISEARCH_HOST)
  const [apiKey, setApiKey] = useMeilisearchApiKey()
  const [indexes, setIndexes] = useState()
  const [isMeilisearchRunning, setIsMeilisearchRunning] = useState(false)
  const [currentIndex, setCurrentIndex] = useLocalStorage('currentIndex')
  const [isApiKeyBannerVisible, setIsApiKeyBannerVisible] = useState(false)
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true)

  const apiKeyDialog = useDialogState({ animated: true, visible: false })
  const closeModalHandler = () => {
    apiKeyDialog.hide()
  }

  const meilisearchClients = useMemo(() => {
    const jsClient = new Meilisearch({
      host: MEILISEARCH_HOST,
      apiKey,
      clientAgents,
    })

    const instantClient = instantMeilisearch(MEILISEARCH_HOST, apiKey, {
      primaryKey: 'id',
      clientAgents,
    }).searchClient

    return { jsClient, instantClient }
  }, [MEILISEARCH_HOST, apiKey])

  const {
    meilisearchJsClient,
    setMeilisearchJsClient,
    setInstantMeilisearchClient,
    instantMeilisearchClient,
  } = useMeilisearchClientContext()

  const getIndexesList = useCallback(async () => {
    try {
      const indexesList = await getIndexesListWithStats(meilisearchJsClient)
      setIndexes(indexesList)
      return indexesList
    } catch (error) {
      setIndexes([])
      console.log(error)
      return []
    }
  }, [meilisearchJsClient])

  // Update currentIndex when indexes change
  useEffect(() => {
    if (indexes?.length > 0) {
      setCurrentIndex(
        currentIndex
          ? indexes.find((option) => option.uid === currentIndex.uid)
          : indexes[0]
      )
    } else {
      setCurrentIndex(null)
    }
  }, [indexes, currentIndex])

  // Check if an API key is required to work
  useEffect(() => {
    const onClientUpdate = async () => {
      try {
        const isInstanceRunning = await meilisearchJsClient.isHealthy()
        setIsMeilisearchRunning(isInstanceRunning)
        if (isInstanceRunning) {
          // Validate the API key by attempting to get indexes
          await meilisearchJsClient.getIndexes()
          getIndexesList()
        }
      } catch (err) {
        console.log('API key validation failed or instance not running')
        apiKeyDialog.setVisible(true)
      }
    }
    onClientUpdate()
  }, [meilisearchJsClient, apiKey, getIndexesList])

  useEffect(() => {
    setHost(MEILISEARCH_HOST)
    setMeilisearchJsClient(meilisearchClients.jsClient)
    setInstantMeilisearchClient(meilisearchClients.instantClient)
  }, [meilisearchClients])

  const handleTogglePanel = useCallback(() => {
    setIsRightPanelOpen((isOpen) => !isOpen)
  }, [])

  // If no API key is provided, show the API key banner and open the API key modal
  useEffect(() => {
    const apiKeyParam = getApiKeyParam()
    if (!apiKey && !apiKeyParam) {
      console.log('No API key provided, opening the modal')
      apiKeyDialog.setVisible(true)
    }
  }, [apiKey])

  // Check if an API key is provided in the URL
  const [hasApiKeyParam, setHasApiKeyParam] = useState(false)
  useEffect(() => {
    const apiKeyParam = getApiKeyParam()
    if (apiKeyParam) {
      setHasApiKeyParam(true)
    }
  }, [setHasApiKeyParam])

  // If an API key is provided in the URL, show the API key banner
  useEffect(() => {
    if (hasApiKeyParam) {
      setIsApiKeyBannerVisible(true)
    }
  }, [hasApiKeyParam])

  return (
    <MeilisearchContext.Provider value={{ apiKey, setApiKey, host }}>
      <GlobalStyle />
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        {isApiKeyBannerVisible && <ApiKeyAwarenessBanner />}
        {isMeilisearchRunning ? (
          <InstantSearch
            indexName={currentIndex ? currentIndex.uid : ''}
            searchClient={instantMeilisearchClient}
          >
            <Header
              indexes={indexes}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              client={meilisearchJsClient}
              refreshIndexes={getIndexesList}
              isApiKeyBannerVisible={isApiKeyBannerVisible}
              isRightPanelOpen={isRightPanelOpen}
              onTogglePanel={handleTogglePanel}
              onOpenApiKeyModal={() => apiKeyDialog.show()}
            />
            <Body
              isRightPanelOpen={isRightPanelOpen}
              currentIndex={currentIndex}
            />
            <RightPanel
              isOpen={isRightPanelOpen}
              onClose={() => setIsRightPanelOpen(false)}
            />
          </InstantSearch>
        ) : (
          <UnreachableInstance baseUrl={MEILISEARCH_HOST} />
        )}
        <Modal
          title="Enter your Admin API key"
          dialog={apiKeyDialog}
          ariaLabel="ask-for-api-key"
        >
          <ApiKeyModalContent
            dialog={apiKeyDialog}
            closeModal={closeModalHandler}
          />
        </Modal>
      </div>
    </MeilisearchContext.Provider>
  )
}

export default App
