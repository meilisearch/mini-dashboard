/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-console */
import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { instantMeiliSearch as instantMeilisearch } from '@meilisearch/instant-meilisearch'
import { useDialogState } from 'reakit/Dialog'
import { MeiliSearch as Meilisearch } from 'meilisearch'

import ApiKeyContext from 'context/ApiKeyContext'
import { useMeilisearchClientContext } from 'context/MeilisearchClientContext'
import useLocalStorage from 'hooks/useLocalStorage'
import ApiKeyModalContent from 'components/ApiKeyModalContent'
import Body from 'components/Body'
import CloudBanner from 'components/CloudBanner'
import Modal from 'components/Modal'
import NoMeilisearchRunning from 'components/NoMeilisearchRunning'
import ApiKeyAwarenessBanner from 'components/ApiKeyAwarenessBanner'
import RightPanel from 'components/RightPanel'
import getIndexesListWithStats from 'utils/getIndexesListWithStats'
import isCloudBannerEnabled from 'utils/isCloudBannerEnabled'
import shouldDisplayApiKeyModal from 'utils/shouldDisplayApiKeyModal'
import hasAnApiKeySet from 'utils/hasAnApiKeySet'
import clientAgents from './version/client-agents'

export const baseUrl =
  process.env.REACT_APP_MEILI_SERVER_ADDRESS ||
  (process.env.NODE_ENV === 'development'
    ? 'http://0.0.0.0:7700'
    : window.location.origin)

const Wrapper = styled.div`
  background-color: ${(p) => p.theme.colors.gray[11]};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const App = () => {
  const [apiKey, setApiKey] = useLocalStorage('apiKey')
  const [, setIndexes] = useState()
  const [isMeilisearchRunning, setIsMeilisearchRunning] = useState(false)
  const [, setRequireApiKeyToWork] = useState(false)
  const [currentIndex, setCurrentIndex] = useLocalStorage('currentIndex')
  const [showCloudBanner, setShowCloudBanner] = useState(false)
  const [isApiKeyBannerVisible, setIsApiKeyBannerVisible] = useState(false)
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true)
  const dialog = useDialogState({ animated: true, visible: false })

  const {
    meilisearchJsClient,
    setMeilisearchJsClient,
    setInstantMeilisearchClient,
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
    if (isCloudBannerEnabled()) {
      setShowCloudBanner(true)
    }
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
        setRequireApiKeyToWork(await hasAnApiKeySet())
        dialog.setVisible(await shouldDisplayApiKeyModal(meilisearchJsClient))
        getIndexesList()
      }
    }
    onClientUpdate()
  }, [meilisearchJsClient])

  const handleCloudBannerClose = () => {
    setShowCloudBanner(false)
    localStorage.setItem('bannerVisibility', JSON.stringify(false))
  }

  // Retrieve the banner visibility state from local storage on component mount
  React.useEffect(() => {
    const storedVisibility = localStorage.getItem('bannerVisibility')
    if (storedVisibility) {
      setShowCloudBanner(JSON.parse(storedVisibility))
    }
    return () => {}
  }, [])

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      <Wrapper>
        {showCloudBanner && <CloudBanner onClose={handleCloudBannerClose} />}
        {isApiKeyBannerVisible && <ApiKeyAwarenessBanner />}
        {isMeilisearchRunning ? (
          <>
            <Body isRightPanelOpen={isRightPanelOpen} />
            <RightPanel
              isOpen={isRightPanelOpen}
              onClose={() => setIsRightPanelOpen(false)}
            />
          </>
        ) : (
          <NoMeilisearchRunning />
        )}
        <Modal dialog={dialog}>
          <ApiKeyModalContent dialog={dialog} />
        </Modal>
      </Wrapper>
    </ApiKeyContext.Provider>
  )
}

export default App
