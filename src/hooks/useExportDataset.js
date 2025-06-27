import { baseUrl } from '../App'

function getBody({ meilisearchUrl, masterKey }) {
  return {
    url: meilisearchUrl,
    apiKey: masterKey,
  }
}

export default function useExport() {
  const endpoint = `${baseUrl}/export`

  const exportDataset = (meilisearchUrl, masterKey) =>
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        getBody({
          meilisearchUrl,
          masterKey,
        })
      ),
    })

  return { exportDataset }
}
