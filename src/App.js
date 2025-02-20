/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-console */
import React, { useState, useEffect, useCallback } from 'react'
import { createGlobalStyle } from 'styled-components'
import { instantMeiliSearch as instantMeilisearch } from '@meilisearch/instant-meilisearch'
import { useDialogState } from 'reakit/Dialog'
import { MeiliSearch as Meilisearch } from 'meilisearch'
import { InstantSearch } from 'react-instantsearch-dom'

import MeilisearchContext from 'context/MeilisearchContext'
import { useMeilisearchClientContext } from 'context/MeilisearchClientContext'
import useLocalStorage from 'hooks/useLocalStorage'
import useMeilisearchApiKey from 'hooks/useMeilisearchApiKey'
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
  const [requireApiKeyToWork, setRequireApiKeyToWork] = useState(false)
  const [currentIndex, setCurrentIndex] = useLocalStorage('currentIndex')
  const [isApiKeyBannerVisible, setIsApiKeyBannerVisible] = useState(false)
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true)

  const apiKeyDialog = useDialogState({ animated: true, visible: false })
  const closeModalHandler = () => {
    apiKeyDialog.hide()
  }

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
      if (indexesList && indexesList?.length > 0) {
        setCurrentIndex(
          currentIndex
            ? indexesList.find((option) => option.uid === currentIndex.uid)
            : indexesList[0]
        )
      } else {
        setCurrentIndex(null)
      }
    } catch (error) {
      setCurrentIndex(null)
      console.log(error)
    }
  }, [meilisearchJsClient, currentIndex])

  useEffect(() => {
    setHost(MEILISEARCH_HOST)
    setApiKey(apiKey)
    setInstantMeilisearchClient(
      instantMeilisearch(MEILISEARCH_HOST, apiKey, {
        primaryKey: 'id',
        clientAgents,
      }).searchClient
    )
    setMeilisearchJsClient(
      new Meilisearch({
        host: MEILISEARCH_HOST,
        apiKey,
        clientAgents,
      })
    )
  }, [MEILISEARCH_HOST, apiKey])

  // Check if an API key is required to work
  useEffect(() => {
    const onClientUpdate = async () => {
      const isInstanceRunning = await meilisearchJsClient.isHealthy()
      setIsMeilisearchRunning(isInstanceRunning)
      if (isInstanceRunning) {
        getIndexesList()
      } else {
        setRequireApiKeyToWork(true)
        apiKeyDialog.setVisible(true)
      }
    }
    onClientUpdate()
  }, [meilisearchJsClient])

  const handleTogglePanel = useCallback(() => {
    setIsRightPanelOpen((isOpen) => !isOpen)
  }, [])

  // If no API key is provided, show the API key banner and open the API key modal
  useEffect(() => {
    if (!apiKey) {
      setIsApiKeyBannerVisible(true)
      apiKeyDialog.setVisible(true)
    }
  }, [apiKey])

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
              requireApiKeyToWork={requireApiKeyToWork}
              client={meilisearchJsClient}
              refreshIndexes={getIndexesList}
              isApiKeyBannerVisible={isApiKeyBannerVisible}
              isRightPanelOpen={isRightPanelOpen}
              onTogglePanel={handleTogglePanel}
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
