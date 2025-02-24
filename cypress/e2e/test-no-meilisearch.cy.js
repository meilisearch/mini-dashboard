describe(`Test without Meilisearch running`, () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Should visit the dashboard', () => {
    cy.url().should('match', /\//)
  })

  it('Should invite to start Meilisearch', () => {
    cy.contains('It seems like Meilisearch isn’t running')
  })
})
