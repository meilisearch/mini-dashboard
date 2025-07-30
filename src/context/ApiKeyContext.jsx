import React from 'react'

const ApiKeyContext = React.createContext({
  apiKey: '',
  setApiKey: () => {},
})

export const ApiKeyProvider = ApiKeyContext.Provider
export const ApiKeyConsumer = ApiKeyContext.Consumer

export default ApiKeyContext
