const WAITING_TIME = Cypress.env('waitingTime')

describe(`Test interface`, () => {
  before(() => {
    // Recreate the movies index with documents in it
    cy.deleteAllIndexes()
    cy.wait(WAITING_TIME)
    cy.createIndex('movies')
    cy.wait(WAITING_TIME)
    cy.fixture('movies.json').then((movies) => {
      cy.addDocuments('movies', movies)
      cy.wait(WAITING_TIME)
    })
    cy.createIndex('pokemon')
    cy.wait(WAITING_TIME)
    cy.fixture('pokemon.json').then((pokemon) => {
      cy.addDocuments('pokemon', pokemon)
      cy.wait(WAITING_TIME)
    })
  })

  beforeEach(() => {
    cy.visit('/')
  })

  it('Should open the help center on click on the "?" button', () => {
    cy.get('button[aria-label="help"]').click()
    cy.get('div[aria-label="Help Center"]').within(() => {
      cy.contains('Help Center')
      cy.contains(
        'If you need help with anything, here are a few links that can be useful.'
      )
      cy.contains('Explore our repositories on Github')
      cy.contains('Join our Discord and find the help you need')
      cy.contains('Learn how to tune your Meilisearch')
      cy.get('a')
        .first()
        .should('have.attr', 'href', 'https://github.com/meilisearch')
        .next()
        .should('have.attr', 'href', 'https://discord.gg/meilisearch')
        .next()
        .should('have.attr', 'href', 'https://docs.meilisearch.com/')
      cy.get('button[aria-label="close"]').click()
    })
  })

  it('Should contain a "Show more" button if a document has more than 6 fields', () => {
    cy.get('ul')
      .children()
      .first()
      .within(() => {
        cy.get('button').contains('Show more')
      })
  })

  it('Shouldn’t contain a "Show more" button if a document has less than 6 fields', () => {
    cy.get('.react-select__control').click()
    cy.get('.react-select__option').contains('pokemon').click()
    cy.get('ul')
      .children()
      .first()
      .within(() => {
        cy.get('button').contains('Show more').should('not.exist')
      })
  })

  it('Should display more fields if the user clicks on the "Show more" button', () => {
    cy.get('.react-select__control').click()
    cy.get('.react-select__option').contains('movies').click()
    cy.get('ul')
      .children()
      .first()
      .within(() => {
        cy.get('button').contains('Show more').click()
        cy.get('>div > div').should('have.length', 8)
      })
  })
  it('Should display a json button', () => {
    cy.get('ul')
      .children()
      .first()
      .within(() => {
        cy.get('button').contains('Show more').click()
        cy.get('button').contains('json')
      })
  })

  it('Should display json on click on the "json" button', () => {
    cy.get('ul')
      .children()
      .first()
      .within(() => {
        cy.get('button').contains('Show more').click()
        cy.get('button').contains('json').click()
        cy.get('div').should('have.class', 'react-json-view')
        cy.get('span').contains('Apple iTunes')
      })
  })

  it('Should display an array button', () => {
    cy.get('ul')
      .children()
      .first()
      .within(() => {
        cy.get('button').contains('Show more').click()
        cy.get('button').contains('array')
      })
  })

  it('Should display an array on click on the "array" button', () => {
    cy.get('ul')
      .children()
      .first()
      .within(() => {
        cy.get('button').contains('Show more').click()
        cy.get('button').contains('array').click()
        cy.get('div').should('have.class', 'react-json-view')
        cy.get('span').contains('Action')
      })
  })
})
