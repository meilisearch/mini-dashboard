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
  })

  it('Should display the movies', () => {
    cy.get('ul')
      .children()
      .should(($p) => {
        expect($p).to.have.length(20)
      })
  })

  it('Should have the api key written in the modal', () => {
    // Test if the query parameter is written in the modal
    // meaning it is added in the local storage
    cy.get('span').contains('Api Key').parent().click()
    cy.get('div[aria-label=settings-api-key]').within(() => {
      cy.get('input[name="apiKey"]').should('have.value', API_KEY)
      cy.get('button').contains('Go').click()
    })
  })
})
