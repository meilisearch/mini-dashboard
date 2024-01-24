import React, { useState, useMemo, createContext, useContext } from 'react'
import { instantMeiliSearch as instantMeilisearch } from '@meilisearch/instant-meilisearch'
import { MeiliSearch as Meilisearch } from 'meilisearch'
import useLocalStorage from 'hooks/useLocalStorage'
import { baseUrl } from 'App'
import clientAgents from 'version/client-agents'

export const MeilisearchClientContext = createContext({
  meilisearchJsClient: '',
  setMeilisearchJsClient: () => {},
  instantMeilisearchClient: '',
  setInstantMeilisearchClient: () => {},
})

export const MeiliSearchClientProvider = ({ children }) => {
  const [apiKey] = useLocalStorage('apiKey')

  const [meilisearchJsClient, setMeilisearchJsClient] = useState(
    new Meilisearch({
      host: baseUrl,
      apiKey,
      clientAgents,
    })
  )
  const [instantMeilisearchClient, setInstantMeilisearchClient] = useState(
    instantMeilisearch(baseUrl, apiKey, {
      primaryKey: 'id',
      clientAgents,
    }).searchClient
  )

  const contextValue = useMemo(
    () => ({
      meilisearchJsClient,
      setMeilisearchJsClient,
      instantMeilisearchClient,
      setInstantMeilisearchClient,
    }),
    [
      meilisearchJsClient,
      setMeilisearchJsClient,
      instantMeilisearchClient,
      setInstantMeilisearchClient,
    ]
  )

  return (
    <MeilisearchClientContext.Provider value={contextValue}>
      {children}
    </MeilisearchClientContext.Provider>
  )
}

export const useMeilisearchClientContext = () => {
  const context = useContext(MeilisearchClientContext)
  if (context === undefined) {
    throw new Error(
      'useMeilisearchClientContext must be used within a MeilisearchClientProvider'
    )
  }
  return context
}
