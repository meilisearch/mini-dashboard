const WAITING_TIME = Cypress.env('waitingTime')
const API_KEY = Cypress.env('apiKey')

describe(`Test indexes`, () => {
  beforeEach(() => {
    cy.deleteAllIndexes()
    cy.wait(WAITING_TIME)
    cy.visit('/')
    cy.get('div[aria-label=ask-for-api-key]').within(() => {
      cy.get('input[name="apiKey"]').clear().type(API_KEY)
      cy.get('button').contains('Go').click()
      cy.wait(WAITING_TIME)
    })
  })

  it('Should inform that the current index is empty', () => {
    cy.createIndex('movies')
    cy.wait(WAITING_TIME)
    cy.visit('/')
    cy.contains('There’s no document in the selected index')
  })

  it('Should display the first index based on localeCompare order on the uid', () => {
    cy.createIndex('novies')
    cy.wait(WAITING_TIME)
    cy.createIndex('movies')
    cy.wait(WAITING_TIME)
    cy.createIndex('oovies')
    cy.wait(WAITING_TIME)
    cy.visit('/')
    cy.get('button[aria-haspopup=menu]').contains('movies 0')
    cy.get('button[aria-haspopup=menu]').click()
    cy.get('div[role=menu]')
      .children()
      .should(($p) => {
        expect($p).to.have.length(3)
        expect($p).to.contain('novies 0')
        expect($p).to.contain('movies 0')
        expect($p).to.contain('oovies 0')
      })
  })

  it('Should display an indexes documents', () => {
    cy.createIndex('movies')
    cy.wait(WAITING_TIME)
    cy.fixture('movies.json')
      .as('movies')
      .then((movies) => {
        cy.addDocuments('movies', movies)
        cy.wait(WAITING_TIME)
      })
    cy.visit('/')
    cy.get('button[aria-haspopup=menu]').contains('movies 33')
    cy.get('ul')
      .children()
      .should(($p) => {
        expect($p).to.have.length(20)
      })
  })

  after(() => {
    cy.deleteAllIndexes()
    cy.wait(WAITING_TIME)
  })
})
