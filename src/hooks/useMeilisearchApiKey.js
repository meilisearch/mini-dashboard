import { useCallback, useEffect } from 'react'
import useLocalStorage from 'hooks/useLocalStorage'
import getApiKeyParam from 'utils/getApiKeyParam'

export default function useMeilisearchApiKey() {
  // Load the API key from the local storage
  const [apiKey, setApiKey] = useLocalStorage('apiKey', '')

  // If the API key is present on the url, update local storage
  const getApiKeyFromUrl = useCallback(() => {
    const apiKeyParam = getApiKeyParam()
    if (apiKeyParam) {
      setApiKey(apiKeyParam)
    }
  }, [setApiKey])

  useEffect(() => {
    getApiKeyFromUrl()
  }, [getApiKeyFromUrl])

  return [apiKey, setApiKey]
}
