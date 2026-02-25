import React, { useState, useMemo, createContext, useContext } from 'react'
import { instantMeiliSearch as instantMeilisearch } from '@meilisearch/instant-meilisearch'
import { MeiliSearch as Meilisearch } from 'meilisearch'
import clientAgents from 'version/client-agents'
import baseUrl from 'config'

export const MeilisearchClientContext = createContext({
  meilisearchJsClient: '',
  setMeilisearchJsClient: () => {},
  instantMeilisearchClient: '',
  setInstantMeilisearchClient: () => {},
})

export const MeiliSearchClientProvider = ({ children }) => {
  // API key is provided in memory by App (via setMeilisearchJsClient/setInstantMeilisearchClient)
  const [meilisearchJsClient, setMeilisearchJsClient] = useState(
    new Meilisearch({
      host: baseUrl,
      apiKey: '',
      clientAgents,
    })
  )
  const [instantMeilisearchClient, setInstantMeilisearchClient] = useState(
    instantMeilisearch(baseUrl, '', {
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
