const getIndexesListWithStats = async (meilisearchJsClient) => {
  const res = await meilisearchJsClient.getStats()
  const array = Object.entries(res.indexes)
  const indexesList = array
    .reduce((prev, curr) => {
      const currentOption = { uid: curr[0], stats: curr[1] }
      return [...prev, currentOption]
    }, [])
    .sort((a, b) => a.uid.localeCompare(b.uid))
  return indexesList
}

export default getIndexesListWithStats
