/* eslint-disable cypress/no-unnecessary-waiting */
const API_KEY = Cypress.env('apiKey')
const WRONG_APIKEY = Cypress.env('wrongApiKey')
const WAITING_TIME = Cypress.env('waitingTime')

const API_KEY_MODAL_ARIA_LABEL = 'ask-for-api-key'
const SAVE_API_KEY_BUTTON_TEXT = 'Save'

describe(`Test API key required`, () => {
  before(() => {
    cy.deleteAllIndexes()
  })

  describe('When there is no API key in local storage', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('Should visit the dashboard', () => {
      cy.url().should('match', /\//)
    })

    it('Should find a text in modal requesting API key', () => {
      cy.contains('Enter your Admin API key')
    })

    it('Should fail on wrong API key triggered with mouse click', () => {
      cy.get(`div[aria-label=${API_KEY_MODAL_ARIA_LABEL}]`).within(() => {
        cy.get('input[name="apiKey"]').as('apiKeyInput')
        cy.get('@apiKeyInput').type(WRONG_APIKEY)
        cy.get('@apiKeyInput').should('have.value', WRONG_APIKEY)
        cy.get('button').contains(SAVE_API_KEY_BUTTON_TEXT).click()
        cy.wait(WAITING_TIME)
        cy.contains('The provided API key is invalid.')
      })
    })

    it('Should fail on wrong API key triggered with enter key', () => {
      cy.get(`div[aria-label=${API_KEY_MODAL_ARIA_LABEL}]`).within(() => {
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
        cy.get('button').contains(SAVE_API_KEY_BUTTON_TEXT).click()
        cy.wait(WAITING_TIME)
      })
      cy.contains('Welcome to')
    })
  })

  describe('When there is an API key in local storage', () => {
    it('Should display the API key', () => {
      // Fill the first API key request
      // cy.get(`div[aria-label=${API_KEY_MODAL_ARIA_LABEL}]`).within(() => {
      //   cy.get('input[name="apiKey"]').as('apiKeyInput')
      //   cy.get('@apiKeyInput').clear()
      //   cy.get('@apiKeyInput').type(API_KEY)
      //   cy.get('button').contains(SAVE_API_KEY_BUTTON_TEXT).click()
      // })
      // cy.wait(WAITING_TIME)

      // Test the value of the Api Key Modal
      window.localStorage.setItem('apiKey', API_KEY)
      cy.visit('/')
      cy.get('button[aria-label="update-api-key"]').click()
      cy.get('div[aria-label=settings-api-key]').within(() => {
        cy.get('input[name="apiKey"]').should('have.value', API_KEY)
      })
    })

    it.skip('Should fail on API Key change inside the API key modal button', () => {
      // Fill the first API key request
      cy.get(`div[aria-label=${API_KEY_MODAL_ARIA_LABEL}]`).within(() => {
        cy.get('input[name="apiKey"]').as('apiKeyInput')
        cy.get('@apiKeyInput').clear()
        cy.get('@apiKeyInput').type(API_KEY)
        cy.get('button').contains(SAVE_API_KEY_BUTTON_TEXT).click()
      })
      cy.visit('/')
      cy.wait(WAITING_TIME)

      // Test the change of API key inside the API Key Modal
      cy.get('span').contains('Api Key').parent().click()
      cy.get(`div[aria-label=${API_KEY_MODAL_ARIA_LABEL}]`).within(() => {
        cy.get('input[name="apiKey"]').as('apiKeyInput')
        cy.get('@apiKeyInput').clear()
        cy.get('@apiKeyInput').type(WRONG_APIKEY)
        cy.get('@apiKeyInput').should('have.value', WRONG_APIKEY)
        cy.get('button').contains(SAVE_API_KEY_BUTTON_TEXT).click()
        cy.wait(WAITING_TIME)
        cy.contains('The provided API key is invalid.')
      })
    })
  })
})
