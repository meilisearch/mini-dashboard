import React, { createContext, useContext, useState, useMemo } from 'react'

const ArtistsContext = createContext()

export const useArtists = () => useContext(ArtistsContext)

export const ArtistsProvider = ({ children }) => {
  const [artists, setArtists] = useState([])

  const value = useMemo(() => ({ artists, setArtists }), [artists])

  return (
    <ArtistsContext.Provider value={value}>{children}</ArtistsContext.Provider>
  )
}
