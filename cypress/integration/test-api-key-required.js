const APIKEY = 'masterKey'
const WRONG_APIKEY = 'wrongApiKey'

describe(`Test API key required`, () => {
  before(() => {
    cy.visit('/')
  })

  it('Should visit the dashboard', () => {
    cy.url().should('match', new RegExp('/'))
  })

  it('Should ask for an API key', () => {
    cy.contains('Enter your private API key')
  })

  it('Should fail on wrong API key', () => {
    cy.get('div[aria-label=ask-for-api-key]').within(() => {
      cy.get('input[name="apiKey"]')
        .type(WRONG_APIKEY)
        .should('have.value', WRONG_APIKEY)
      cy.get('button').contains('Go').click()
      cy.contains('Invalid API key')
    })
  })

  it('Should accept valid API key', () => {
    cy.get('div[aria-label=ask-for-api-key]').within(() => {
      cy.get('input[name="apiKey"]')
        .clear()
        .type(APIKEY)
        .should('have.value', APIKEY)
      cy.get('button').contains('Go').click()
    })
    cy.contains('Welcome to')
  })

  it('Should display a modal with API key inside the API key modal button', () => {
    cy.get('span').contains('Api Key').parent().click()
    cy.get('div[aria-label=settings-api-key]').within(() => {
      cy.get('input[name="apiKey"]').should('have.value', APIKEY)
    })
  })

  it('Should fail on API Key change inside the API key modal button', () => {
    cy.get('div[aria-label=settings-api-key]').within(() => {
      cy.get('input[name="apiKey"]')
        .clear()
        .type(WRONG_APIKEY)
        .should('have.value', WRONG_APIKEY)
      cy.get('button').contains('Go').click()
      cy.contains('Invalid API key')
    })
  })
})
