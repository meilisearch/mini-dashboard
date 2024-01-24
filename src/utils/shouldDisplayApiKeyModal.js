const shouldDisplayApiKeyModal = async (meilisearchJsClient) => {
  try {
    await meilisearchJsClient.getIndexes()
    return false
  } catch (err) {
    return true
  }
}

export default shouldDisplayApiKeyModal
