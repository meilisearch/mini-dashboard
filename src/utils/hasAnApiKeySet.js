import { MeiliSearch as Meilisearch } from 'meilisearch'
import { baseUrl } from 'App'
import clientAgents from 'version/client-agents'

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
