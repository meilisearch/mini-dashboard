import React from 'react'

const MeilisearchContext = React.createContext({
  apiKey: '',
  setApiKey: () => {},
  host: '',
  setHost: () => {},
})

export const MeilisearchProvider = MeilisearchContext.Provider
export const MeilisearchConsumer = MeilisearchContext.Consumer

export default MeilisearchContext
