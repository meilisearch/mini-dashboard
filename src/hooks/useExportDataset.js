function getBody({ meilisearchUrl, masterKey }) {
  return {
    url: meilisearchUrl,
    apiKey: masterKey,
  }
}

export default function useExport() {
  const endpoint = `http://localhost:7700/export`

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
