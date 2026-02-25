/* eslint-disable no-console */
const { MeiliSearch: Meilisearch } = require('meilisearch')

const { apiKey, host } = Cypress.env()

Cypress.Commands.add('deleteAllIndexes', async () => {
  try {
    const client = new Meilisearch({
      host,
      apiKey,
    })
    const { results: indexes } = await client.getIndexes()
    indexes.forEach(async (index) => {
      const task = await client.deleteIndex(index.uid)
      await client.waitForTask(task.taskUid)
    })
  } catch (e) {
    console.log({ e })
  }
})

Cypress.Commands.add('createIndex', async (uid) => {
  try {
    const client = new Meilisearch({
      host,
      apiKey,
    })
    const task = await client.createIndex(uid)
    await client.waitForTask(task.taskUid)
  } catch (e) {
    console.log({ e })
  }
})

Cypress.Commands.add('addDocuments', async (uid, documents) => {
  try {
    const client = new Meilisearch({
      host,
      apiKey,
    })
    const index = await client.getIndex(uid)
    const task = await index.addDocuments(documents)
    await client.waitForTask(task.taskUid)
  } catch (e) {
    console.log({ e })
  }
})

// API key is no longer stored in localStorage (REC03). Use URL param: visit(`/?api_key=${apiKey}`)
Cypress.Commands.add('visitWithApiKey', () => {
  cy.visit(`/?api_key=${apiKey}`)
})
