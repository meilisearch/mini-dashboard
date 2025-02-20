export default function getApiKeyParam() {
  const urlParams = new URLSearchParams(window.location.search)
  const apiKeyParam = urlParams.get('api_key')
  return apiKeyParam
}
