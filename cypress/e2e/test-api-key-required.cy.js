/* eslint-disable cypress/no-unnecessary-waiting */
const API_KEY = Cypress.env('apiKey')
const WRONG_APIKEY = Cypress.env('wrongApiKey')
const WAITING_TIME = Cypress.env('waitingTime')

describe(`Test API key required`, () => {
  before(() => {
    cy.deleteAllIndexes()
  })

  beforeEach(() => {
    cy.visit('/')
  })

  it('Should visit the dashboard', () => {
    cy.url().should('match', /\//)
  })

  it('Should find a text in modal requesting API key', () => {
    cy.contains('Enter your admin API key')
  })

  it('Should fail on wrong API key triggered with mouse click', () => {
    cy.get('div[aria-label=ask-for-api-key]').within(() => {
      cy.get('input[name="apiKey"]').as('apiKeyInput')
      cy.get('@apiKeyInput').type(WRONG_APIKEY)
      cy.get('@apiKeyInput').should('have.value', WRONG_APIKEY)
      cy.get('button').contains('Go').click()
      cy.wait(WAITING_TIME)
      cy.contains('The provided API key is invalid.')
    })
  })

  it('Should fail on wrong API key triggered with enter key', () => {
    cy.get('div[aria-label=ask-for-api-key]').within(() => {
      cy.get('input[name="apiKey"]').as('apiKeyInput')
      cy.get('@apiKeyInput').type(WRONG_APIKEY)
      cy.get('@apiKeyInput').should('have.value', WRONG_APIKEY)
      cy.get('@apiKeyInput').type('{enter}')
      cy.wait(WAITING_TIME)
      cy.contains('The provided API key is invalid.')
    })
  })

  it('Should accept valid API key', () => {
    cy.get('div[aria-label=ask-for-api-key]').within(() => {
      cy.get('input[name="apiKey"]').as('apiKeyInput')
      cy.get('@apiKeyInput').clear()
      cy.get('@apiKeyInput').type(API_KEY)
      cy.get('@apiKeyInput').should('have.value', API_KEY)
      cy.get('button').contains('Go').click()
      cy.wait(WAITING_TIME)
    })
    cy.contains('Welcome to')
  })

  it('Should display a modal with API key inside the API key modal button', () => {
    // Fill the first API key request
    cy.get('div[aria-label=ask-for-api-key]').within(() => {
      cy.get('input[name="apiKey"]').as('apiKeyInput')
      cy.get('@apiKeyInput').clear()
      cy.get('@apiKeyInput').type(API_KEY)
      cy.get('button').contains('Go').click()
    })
    cy.visit('/')
    cy.wait(WAITING_TIME)

    // Test the value of the Api Key Modal
    cy.get('span').contains('Api Key').parent().click()
    cy.get('div[aria-label=settings-api-key]').within(() => {
      cy.get('input[name="apiKey"]').should('have.value', API_KEY)
    })
  })

  it('Should fail on API Key change inside the API key modal button', () => {
    // Fill the first API key request
    cy.get('div[aria-label=ask-for-api-key]').within(() => {
      cy.get('input[name="apiKey"]').as('apiKeyInput')
      cy.get('@apiKeyInput').clear()
      cy.get('@apiKeyInput').type(API_KEY)
      cy.get('button').contains('Go').click()
    })
    cy.visit('/')
    cy.wait(WAITING_TIME)

    // Test the change of API key inside the API Key Modal
    cy.get('span').contains('Api Key').parent().click()
    cy.get('div[aria-label=settings-api-key]').within(() => {
      cy.get('input[name="apiKey"]').as('apiKeyInput')
      cy.get('@apiKeyInput').clear()
      cy.get('@apiKeyInput').type(WRONG_APIKEY)
      cy.get('@apiKeyInput').should('have.value', WRONG_APIKEY)
      cy.get('button').contains('Go').click()
      cy.wait(WAITING_TIME)
      cy.contains('The provided API key is invalid.')
    })
  })
})
