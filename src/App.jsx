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
import Modal from 'components/Modal'
import NoMeilisearchRunning from 'components/NoMeilisearchRunning'
import ApiKeyAwarenessBanner from 'components/ApiKeyAwarenessBanner'
import getIndexesListWithStats from 'utils/getIndexesListWithStats'
import shouldDisplayApiKeyModal from 'utils/shouldDisplayApiKeyModal'
import hasAnApiKeySet from 'utils/hasAnApiKeySet'
import baseUrl from 'config'
import clientAgents from './version/client-agents'

const Wrapper = styled.div`
  background-color: ${(p) => p.theme.colors.gray[11]};
  min-height: 100vh;
`

// API key is stored in memory only (no localStorage) per security recommendation
const App = () => {
  const [apiKey, setApiKey] = useState('')
  const [indexes, setIndexes] = useState()
  const [isMeilisearchRunning, setIsMeilisearchRunning] = useState(false)
  const [requireApiKeyToWork, setRequireApiKeyToWork] = useState(false)
  const [currentIndex, setCurrentIndex] = useLocalStorage('currentIndex')
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

  // One-time cleanup: remove any API key previously stored in localStorage (REC03)
  useEffect(() => {
    try {
      window.localStorage.removeItem('apiKey')
    } catch (_) {
      // ignore errors when clearing apiKey
    }
  }, [])

  // If the API key is present in the URL, use it in memory only (not persisted)
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
        setRequireApiKeyToWork(await hasAnApiKeySet())
        dialog.setVisible(await shouldDisplayApiKeyModal(meilisearchJsClient))
        getIndexesList()
      }
    }
    onClientUpdate()
  }, [meilisearchJsClient])

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      <Wrapper>
        {isApiKeyBannerVisible && (
          <ApiKeyAwarenessBanner
            onClose={() => setIsApiKeyBannerVisible(false)}
          />
        )}
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
