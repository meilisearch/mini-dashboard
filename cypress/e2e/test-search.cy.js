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
  })

  beforeEach(() => {
    // Set API key in localStorage before visiting the page to avoid triggering the modal
    cy.window().then((win) => {
      win.localStorage.setItem('apiKey', JSON.stringify(API_KEY))
    })
    cy.visit('/')
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
