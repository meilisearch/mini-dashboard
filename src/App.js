/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-console */
import React, { useState, useEffect, useCallback } from 'react'
import { createGlobalStyle } from 'styled-components'
import { instantMeiliSearch as instantMeilisearch } from '@meilisearch/instant-meilisearch'
import { useDialogState } from 'reakit/Dialog'
import { MeiliSearch as Meilisearch } from 'meilisearch'
import { InstantSearch } from 'react-instantsearch-dom'

import ApiKeyContext from 'context/ApiKeyContext'
import { useMeilisearchClientContext } from 'context/MeilisearchClientContext'
import useLocalStorage from 'hooks/useLocalStorage'
import ApiKeyModalContent from 'components/ApiKeyModalContent'
import Body from 'components/Body'
import Modal from 'components/Modal'
import UnreachableInstance from 'components/UnreachableInstance'
import ApiKeyAwarenessBanner from 'components/ApiKeyAwarenessBanner'
import RightPanel from 'components/RightPanel'
import Header from 'components/Header'
import getIndexesListWithStats from 'utils/getIndexesListWithStats'
import clientAgents from './version/client-agents'

export const baseUrl =
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
  const [apiKey, setApiKey] = useLocalStorage('apiKey')
  const [indexes, setIndexes] = useState()
  const [isMeilisearchRunning, setIsMeilisearchRunning] = useState(false)
  const [requireApiKeyToWork, setRequireApiKeyToWork] = useState(false)
  const [currentIndex, setCurrentIndex] = useLocalStorage('currentIndex')
  const [isApiKeyBannerVisible, setIsApiKeyBannerVisible] = useState(false)
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true)

  const dialog = useDialogState({ animated: true, visible: false })
  const closeModalHandler = () => {
    dialog.hide()
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

  // Check if the API key is present on the url then put it in the local storage
  const getApiKeyFromUrl = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const apiKeyParam = urlParams.get('api_key')
    if (apiKeyParam) {
      setApiKey(apiKeyParam)
      setIsApiKeyBannerVisible(true)
    }
  }, [])

  useEffect(() => {
    getApiKeyFromUrl()
  }, [])

  useEffect(() => {
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
  }, [apiKey])

  useEffect(() => {
    const onClientUpdate = async () => {
      const isInstanceRunning = await meilisearchJsClient.isHealthy()
      setIsMeilisearchRunning(isInstanceRunning)
      if (isInstanceRunning) {
        getIndexesList()
      } else {
        setRequireApiKeyToWork(true)
        dialog.setVisible(true)
      }
    }
    onClientUpdate()
  }, [meilisearchJsClient])

  const handleTogglePanel = useCallback(() => {
    setIsRightPanelOpen((isOpen) => !isOpen)
  }, [])

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
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
          <UnreachableInstance baseUrl={baseUrl} />
        )}
        <Modal title="Enter your Admin API key" dialog={dialog}>
          <ApiKeyModalContent
            host={baseUrl}
            dialog={dialog}
            closeModal={closeModalHandler}
          />
        </Modal>
      </div>
    </ApiKeyContext.Provider>
  )
}

export default App
