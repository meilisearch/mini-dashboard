/* eslint-disable cypress/no-unnecessary-waiting */
const APIKEY = 'masterKey'
const WRONG_APIKEY = 'wrongApiKey'
const WAITING_TIME = 1000

describe(`Test API key required`, () => {
  before(() => {
    cy.visit('/')
  })

  it('Should visit the dashboard', () => {
    cy.url().should('match', new RegExp('/'))
  })

  it('Should find a text in modal requesting API key', () => {
    cy.contains('Enter your private API key')
  })

  it('Should fail on wrong API key', () => {
    cy.get('div[aria-label=ask-for-api-key]').within(() => {
      cy.get('input[name="apiKey"]')
        .type(WRONG_APIKEY)
        .should('have.value', WRONG_APIKEY)
      cy.get('button').contains('Go').click()
      cy.wait(WAITING_TIME)
      cy.contains('The provided API key is invalid.')
    })
  })

  it('Should accept valid API key', () => {
    cy.get('div[aria-label=ask-for-api-key]').within(() => {
      cy.get('input[name="apiKey"]')
        .clear()
        .type(APIKEY)
        .should('have.value', APIKEY)
      cy.get('button').contains('Go').click()
      cy.wait(WAITING_TIME)
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
      cy.wait(WAITING_TIME)
      cy.contains('The provided API key is invalid.')
    })
  })
})
