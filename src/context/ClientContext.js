import React from 'react'

const ClientContext = React.createContext({
  client: {},
  setClient: () => {},
})

export const ClientProvider = ClientContext.Provider
export const ClientConsumer = ClientContext.Consumer

export default ClientContext
