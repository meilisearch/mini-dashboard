const SELECTOR = '.cloud-banner'

describe('Cloud Banner', () => {
  it('should show cloud banner by default', () => {
    cy.visit('/')
    cy.get(SELECTOR).should('be.visible')
  })

  it('should hide cloud banner when cloud_banner=false query param is present', () => {
    cy.visit('/?cloud_banner=false')
    cy.get(SELECTOR).should('not.exist')
  })

  it('should show cloud banner with other query params when cloud_banner is not false', () => {
    cy.visit('/?cloud_banner=true&other_param=123')
    cy.get(SELECTOR).should('be.visible')
  })

  it('should show cloud banner with invalid cloud_banner values', () => {
    cy.visit('/?cloud_banner=invalid')
    cy.get(SELECTOR).should('be.visible')
  })
})
