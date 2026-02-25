const WAITING_TIME = Cypress.env('waitingTime')

describe(`Right side panel`, () => {
  beforeEach(() => {
    cy.visitWithApiKey()
  })

  it('Should be opened by default', () => {
    cy.get('[data-testid="right-panel"]').should('be.visible')
  })

  it('Should be closed when clicking on the close button', () => {
    cy.get('button[aria-label="Close Panel"]').click()
    cy.get('[data-testid="right-panel"]').should('not.be.visible')
  })

  it('Should be opened when clicking on the menu bars button', () => {
    cy.get('button[aria-label="Close Panel"]').click()
    cy.get('button[aria-label="Open Panel"]').click()
    cy.get('[data-testid="right-panel"]').should('be.visible')
  })

  it('Should allow subscribing to the newsletter', () => {
    cy.get('input[placeholder="Enter your email"]').type('kero@meilisearch.com')
    cy.get('button[aria-label="Subscribe"]').click()
    cy.wait(WAITING_TIME)
    cy.get('[data-testid="right-panel"]').within(() => {
      cy.get('p').should('contain', 'Thanks for subscribing!')
    })
  })
})
