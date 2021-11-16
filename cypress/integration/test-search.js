const WAITING_TIME = Cypress.env('waitingTime')
const API_KEY = Cypress.env('apiKey')

describe(`Test search`, () => {
  before(() => {
    // Recreate the movies index with documents in it
    cy.deleteAllIndexes()
    cy.wait(WAITING_TIME)
    cy.createIndex('movies')
    cy.wait(WAITING_TIME)
    cy.fixture('movies.json').then((movies) => {
      cy.addDocuments('movies', movies)
      cy.wait(WAITING_TIME)
    })
    cy.visit('/')
    // Fill the API key
    cy.get('div[aria-label=ask-for-api-key]').within(() => {
      cy.get('input[name="apiKey"]').clear().type(API_KEY)
      cy.get('button').contains('Go').click()
      cy.wait(WAITING_TIME)
    })
  })

  beforeEach(() => {
    cy.get('input[type="search"]').clear()
  })

  it('Should update the results according to the user’s search', () => {
    cy.get('input[type="search"]').type('Fifth Element')
    cy.get('ul')
      .children()
      .should(($p) => {
        expect($p).to.have.length(1)
      })
  })

  it('Should display a message if there are no result for the user’s search', () => {
    cy.get('input[type="search"]').type('zz')
    cy.contains('Sorry mate, no results matching your request')
  })

  it('Should display a "Load more" button if there are more than 20 results', () => {
    cy.get('input[type="search"]')
    cy.get('ul')
      .children()
      .should(($p) => {
        expect($p).to.have.length(20)
      })
    cy.contains('Load more')
  })

  it('Should load the next documents on click on the "Load more" button', () => {
    cy.get('span').contains('Load more').parent().click()
    cy.get('ul')
      .children()
      .should(($p) => {
        expect($p).to.have.length(33)
      })
  })
})
