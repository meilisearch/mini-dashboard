import { useCallback, useEffect } from 'react'
import useLocalStorage from 'hooks/useLocalStorage'

export const useMeilisearchApiKey = () => {
  // Load the API key from the local storage
  const [apiKey, setApiKey] = useLocalStorage('apiKey')

  // If the API key is present on the url, update local storage
  const getApiKeyFromUrl = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const apiKeyParam = urlParams.get('api_key')
    if (apiKeyParam) {
      setApiKey(apiKeyParam)
    }
  }, [])

  useEffect(() => {
    getApiKeyFromUrl()
  }, [])

  return [apiKey, setApiKey]
}

export default useMeilisearchApiKey
