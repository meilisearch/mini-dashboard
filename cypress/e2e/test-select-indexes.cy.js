const WAITING_TIME = Cypress.env('waitingTime')

describe(`Test indexes`, () => {
  before(() => {
    cy.deleteAllIndexes()
    cy.wait(WAITING_TIME)

    cy.createIndex('lovies')
    cy.wait(WAITING_TIME)
    cy.createIndex('movies')
    cy.wait(WAITING_TIME)
    cy.createIndex('pokemon')
    cy.wait(WAITING_TIME)

    cy.fixture('movies.json')
      .as('movies')
      .then((movies) => {
        cy.addDocuments('movies', movies)
        cy.wait(WAITING_TIME)
      })
    cy.wait(WAITING_TIME)

    cy.fixture('pokemon.json')
      .as('pokemon')
      .then((pokemon) => {
        cy.addDocuments('pokemon', pokemon)
        cy.wait(WAITING_TIME)
      })
    cy.wait(WAITING_TIME)
  })

  beforeEach(() => {
    cy.visit('/')
  })

  it('Should display the first index based on localeCompare order on the uid', () => {
    cy.get('button[aria-haspopup=menu]').contains('lovies 0')
  })

  it('Should list all the indexes inside the select', () => {
    cy.get('button[aria-haspopup=menu]').click()
    cy.get('div[role=menu]')
      .children()
      .should(($p) => {
        expect($p).to.have.length(3)
        expect($p).to.contain('lovies 0')
        expect($p).to.contain('movies 33')
        expect($p).to.contain('pokemon 3')
      })
  })

  it('Should inform that the current index is empty', () => {
    cy.contains('There’s no document in the selected index')
  })

  it('Should display an indexes documents', () => {
    cy.get('button[aria-haspopup=menu]').click()
    cy.get('button[role=menuitem]').contains('movies').click()
    cy.get('ul')
      .children()
      .should(($p) => {
        expect($p).to.have.length(20)
      })
  })

  it('Should display the documents of an other index on click on it', () => {
    cy.get('button[aria-haspopup=menu]').click()
    cy.get('button[role=menuitem]').contains('pokemon').click()
    cy.get('ul').children().should('have.length', 3)
    cy.get('ul')
      .children()
      .first()
      .within(() => {
        cy.contains('Bulbasaur')
      })
  })

  after(() => {
    cy.deleteAllIndexes()
    cy.wait(WAITING_TIME)
  })
})
