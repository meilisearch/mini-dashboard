describe(`Test without MeiliSearch running`, () => {
  before(() => {
    cy.visit('/')
  })

  it('Should visit the dashboard', () => {
    cy.url().should('match', new RegExp('/'))
  })

  it('Should invite to start MeiliSearch', () => {
    cy.contains('It seems like MeiliSearch isn’t running')
  })
})
