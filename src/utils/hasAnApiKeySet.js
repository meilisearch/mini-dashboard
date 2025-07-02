import { MeiliSearch as Meilisearch } from 'meilisearch'
import clientAgents from 'version/client-agents'
import baseUrl from 'config'

const hasAnApiKeySet = async () => {
  try {
    const tempClient = new Meilisearch({ host: baseUrl, clientAgents })
    await tempClient.getIndexes()
    return false
  } catch (err) {
    return err.cause.code === 'missing_authorization_header'
  }
}

export default hasAnApiKeySet
