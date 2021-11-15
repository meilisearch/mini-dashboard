describe(`Test indexes`, () => {
  before(() => {
    cy.visit('/')
    cy.deleteAllIndexed()
    cy.createIndex('movies')
  })

  it('Should visit the dashboard', () => {
    cy.url().should('match', new RegExp('/'))
  })

  it('Should inform that the current index is empty', () => {
    cy.contains('There’s no document in the selected index')
  })
})
