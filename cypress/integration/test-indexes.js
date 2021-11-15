describe(`Test indexes`, () => {
  beforeEach(() => {
    cy.deleteAllIndexed()
  })

  it('Should visit the dashboard', () => {
    cy.visit('/')
    cy.url().should('match', new RegExp('/'))
  })

  it('Should display the first index based on localeCompare order on the uid', () => {
    cy.createIndex('novies')
    cy.createIndex('movies')
    cy.createIndex('oovies')
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
    cy.fixture('movies.json')
      .as('movies')
      .then((movies) => {
        cy.addDocuments('movies', movies)
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
    cy.deleteAllIndexed()
  })
})
