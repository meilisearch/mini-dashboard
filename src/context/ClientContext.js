import React from 'react'

const ClientContext = React.createContext({
  ISClient: {},
  IMSlient: {},
  setISClient: () => {},
  setMSClient: () => {},
})

export const ClientProvider = ClientContext.Provider
export const ClientConsumer = ClientContext.Consumer

export default ClientContext
