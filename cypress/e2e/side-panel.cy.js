describe(`Right side panel`, () => {
  beforeEach(() => {
    cy.saveApiTokenCookie()
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
