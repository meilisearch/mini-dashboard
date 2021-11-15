/* eslint-disable no-console */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const { MeiliSearch } = require('meilisearch')

const APIKEY = 'masterKey'
const HOST = 'http://0.0.0.0:7700'

Cypress.Commands.add('deleteAllIndexed', async () => {
  try {
    const client = new MeiliSearch({
      host: HOST,
      apiKey: APIKEY,
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
      host: HOST,
      apiKey: APIKEY,
    })
    await client.createIndex(uid)
  } catch (e) {
    console.log({ e })
  }
})

Cypress.Commands.add('addDocuments', async (uid, documents) => {
  try {
    const client = new MeiliSearch({
      host: HOST,
      apiKey: APIKEY,
    })
    const index = await client.getIndex(uid)
    await index.addDocuments(documents)
  } catch (e) {
    console.log({ e })
  }
})
