/* eslint-disable no-console */
const { MeiliSearch } = require('meilisearch')

const { apiKey, host } = Cypress.env()

Cypress.Commands.add('deleteAllIndexes', async () => {
  try {
    const client = new MeiliSearch({
      host,
      apiKey,
    })
    const indexes = await client.getIndexes()
    indexes.forEach(async (index) => {
      await client.deleteIndex(index.uid)
    })
  } catch (e) {
    console.log({ e })
  }
})

Cypress.Commands.add('createIndex', async (uid) => {
  try {
    const client = new MeiliSearch({
      host,
      apiKey,
    })
    await client.createIndex(uid)
  } catch (e) {
    console.log({ e })
  }
})

Cypress.Commands.add('addDocuments', async (uid, documents) => {
  try {
    const client = new MeiliSearch({
      host,
      apiKey,
    })
    const index = await client.getIndex(uid)
    await index.addDocuments(documents)
  } catch (e) {
    console.log({ e })
  }
})
