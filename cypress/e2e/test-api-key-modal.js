const WAITING_TIME = Cypress.env('waitingTime')

describe(`API key modal`, () => {
  before(() => {
    cy.deleteAllIndexes()
    cy.wait(WAITING_TIME)
  })

  beforeEach(() => {
    cy.visit('/')
  })

  describe('Landing page', () => {
    it('Does not redirect if no API key is set', () => {
      cy.url().should('match', /\//)
    })

    it('Should display the default view', () => {
      cy.contains(
        'This dashboard will help you check the search results with ease.'
      )
      cy.contains('Enter your Admin API key (optional)')
      cy.contains('Select an index')
    })
  })

  describe('Opening the modal', () => {
    it('Should display a message telling that no api key is required', () => {
      cy.get('span').contains('API Key').parent().click()
      cy.wait(WAITING_TIME)
      cy.get('div[aria-label=settings-api-key]').within(() => {
        cy.contains('Enter your Admin API key (optional)')
        cy.contains('No API key provided.')
      })
    })
  })
})
