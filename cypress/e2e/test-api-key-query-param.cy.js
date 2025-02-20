/* eslint-disable cypress/no-unnecessary-waiting */
const API_KEY = Cypress.env('apiKey')
const WAITING_TIME = Cypress.env('waitingTime')

describe(`Test API key required with query params`, () => {
  before(() => {
    cy.deleteAllIndexes()

    cy.wait(WAITING_TIME)
    cy.createIndex('movies')
    cy.wait(WAITING_TIME)
    cy.fixture('movies.json').then((movies) => {
      cy.addDocuments('movies', movies)
      cy.wait(WAITING_TIME)
    })
  })

  beforeEach(() => {
    cy.visit(`/?api_key=${API_KEY}`)
    // Wait for the API key to be stored and modal to be hidden
    cy.window()
      .its('localStorage')
      .should((localStorage) => {
        const storedApiKey = localStorage.getItem('apiKey')
        expect(JSON.parse(storedApiKey)).to.equal(API_KEY)
      })
  })

  it('Should display the movies', () => {
    cy.wait(WAITING_TIME)
    cy.get('ul')
      .children()
      .should(($p) => {
        expect($p).to.have.length(20)
      })
  })

  it('Should have the api key written in the modal', () => {
    cy.get('button[aria-label="Edit API key"]').click()
    cy.get('div[aria-label=ask-for-api-key]').within(() => {
      cy.get('input[name="apiKey"]').should('have.value', API_KEY)
    })
  })
})
