/* eslint-disable cypress/no-unnecessary-waiting */
const API_KEY = Cypress.env('apiKey')
const WRONG_APIKEY = Cypress.env('wrongApiKey')
const WAITING_TIME = Cypress.env('waitingTime')

const API_MODAL_SELECTOR = `div[aria-label=ask-for-api-key]`
const SAVE_API_KEY_BUTTON_TEXT = 'Save'

describe(`API key is required`, () => {
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
      cy.get(API_MODAL_SELECTOR).within(() => {
        cy.get('input[name="apiKey"]').as('apiKeyInput')
        cy.get('@apiKeyInput').type(WRONG_APIKEY)
        cy.get('@apiKeyInput').should('have.value', WRONG_APIKEY)
        cy.get('button').contains(SAVE_API_KEY_BUTTON_TEXT).click()
        cy.wait(WAITING_TIME)
        cy.contains('The provided API key is invalid.')
      })
    })

    it('Should fail on wrong API key triggered with enter key', () => {
      cy.get(API_MODAL_SELECTOR).within(() => {
        cy.get('input[name="apiKey"]').as('apiKeyInput')
        cy.get('@apiKeyInput').type(WRONG_APIKEY)
        cy.get('@apiKeyInput').should('have.value', WRONG_APIKEY)
        cy.get('@apiKeyInput').type('{enter}')
        cy.wait(WAITING_TIME)
        cy.contains('The provided API key is invalid.')
      })
    })

    it('Should accept valid API key', () => {
      cy.get(API_MODAL_SELECTOR).within(() => {
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

  describe('With existing API key in local storage', () => {
    it('Should display the API key', () => {
      // Set API key in localStorage before visiting the page
      cy.window().then((win) => {
        win.localStorage.setItem('apiKey', JSON.stringify(API_KEY))
      })
      cy.visit('/')

      // Wait for any initial animations/loading to complete
      cy.wait(WAITING_TIME)

      // Click the API key button to open settings modal
      cy.get('button[aria-label="Edit API key"]').click()

      // Verify the API key in the settings modal
      cy.get(API_MODAL_SELECTOR).within(() => {
        cy.get('input[name="apiKey"]').should('have.value', API_KEY)
      })
    })

    it('Should open the modal when the API key is invalid', () => {
      cy.window().then((win) => {
        win.localStorage.setItem('apiKey', JSON.stringify(WRONG_APIKEY))
      })
      cy.visit('/')

      cy.get(API_MODAL_SELECTOR).within(() => {
        cy.get('input[name="apiKey"]').as('apiKeyInput')
        cy.get('@apiKeyInput').should('have.value', WRONG_APIKEY)
      })
    })
  })

  describe(`Providing an API key in the query params`, () => {
    before(() => {
      cy.deleteAllIndexes()

      cy.wait(WAITING_TIME)
      cy.createIndex('movies')
      cy.wait(WAITING_TIME)
      cy.fixture('movies.json').then((movies) => {
        cy.addDocuments('movies', movies)
        cy.wait(WAITING_TIME)
      })
    })

    beforeEach(() => {
      cy.visit(`/?api_key=${API_KEY}`)
      // Wait for the API key to be stored and modal to be hidden
      cy.window()
        .its('localStorage')
        .should((localStorage) => {
          const storedApiKey = localStorage.getItem('apiKey')
          expect(JSON.parse(storedApiKey)).to.equal(API_KEY)
        })
    })

    it('Should display the movies', () => {
      cy.wait(WAITING_TIME)
      cy.get('ul')
        .children()
        .should(($p) => {
          expect($p).to.have.length(20)
        })
    })

    it('Should have the api key written in the modal', () => {
      cy.get('button[aria-label="Edit API key"]').click()
      cy.get(API_MODAL_SELECTOR).within(() => {
        cy.get('input[name="apiKey"]').should('have.value', API_KEY)
      })
    })
  })
})
