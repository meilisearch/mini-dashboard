const WAITING_TIME = Cypress.env('waitingTime')

describe(`Test no API key required`, () => {
  before(() => {
    cy.deleteAllIndexes()
    cy.wait(WAITING_TIME)
    cy.visit('/')
  })

  it('Should visit the dashboard', () => {
    cy.url().should('match', /\//)
  })

  it('Should display the help cards view', () => {
    cy.contains(
      'This dashboard will help you check the search results with ease.'
    )
    cy.contains('Set your API key (facultative)')
    cy.contains('Select an index')
  })

  it('Should display a message telling that no api key is required', () => {
    cy.get('span').contains('Api Key').parent().click()
    cy.get('div[aria-label=settings-api-key]').within(() => {
      cy.contains('Enter your private API key (facultative)')
      cy.contains(
        'You haven’t set an API key yet, if you want to set one you can read the documentation'
      )
    })
  })
})
