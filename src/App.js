/* eslint-disable no-unused-vars */
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
import getIndexesListWithStats from 'utils/getIndexesListWithStats'
import shouldDisplayCloudBanner from 'utils/shouldDisplayCloudBanner'
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
`

const App = () => {
  const [apiKey, setApiKey] = useLocalStorage('apiKey')
  const [indexes, setIndexes] = useState()
  const [isMeilisearchRunning, setIsMeilisearchRunning] = useState(false)
  const [requireApiKeyToWork, setRequireApiKeyToWork] = useState(false)
  const [currentIndex, setCurrentIndex] = useLocalStorage('currentIndex')
  const [showCloudBanner, setShowCloudBanner] = useState(false)
  const [isApiKeyBannerVisible, setIsApiKeyBannerVisible] = useState(false)
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
    const shouldCloudBannerBeDisplayed = shouldDisplayCloudBanner()
    if (shouldCloudBannerBeDisplayed) {
      setShowCloudBanner(shouldCloudBannerBeDisplayed)
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

  useEffect(async () => {
    const isInstanceRunning = await meilisearchJsClient.isHealthy()
    setIsMeilisearchRunning(isInstanceRunning)
    if (isInstanceRunning) {
      setRequireApiKeyToWork(await hasAnApiKeySet())
      dialog.setVisible(await shouldDisplayApiKeyModal(meilisearchJsClient))
      getIndexesList()
    }
  }, [meilisearchJsClient])

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      <Wrapper>
        {isApiKeyBannerVisible && (
          <ApiKeyAwarenessBanner
            onClose={() => setIsApiKeyBannerVisible(false)}
          />
        )}
        {showCloudBanner && <CloudBanner />}
        {isMeilisearchRunning ? (
          <Body
            currentIndex={currentIndex}
            indexes={indexes}
            setCurrentIndex={setCurrentIndex}
            requireApiKeyToWork={requireApiKeyToWork}
            getIndexesList={getIndexesList}
            isApiKeyBannerVisible={isApiKeyBannerVisible}
          />
        ) : (
          <NoMeilisearchRunning />
        )}
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
