const API_KEY = Cypress.env('apiKey')

describe(`Right side panel`, () => {
  beforeEach(() => {
    // Set API key in localStorage before visiting the page to avoid triggering the modal
    cy.window().then((win) => {
      win.localStorage.setItem('apiKey', JSON.stringify(API_KEY))
    })
    cy.visit('/')
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
})
