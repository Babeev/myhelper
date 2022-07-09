/// <reference types="cypress" />

describe('get all services', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'POST',
        url: 'http://5.130.78.41:27020/api/add/user',
      },
      { fixture: 'auth.json' }
    ).as('signup')

    cy.intercept(
      {
        method: 'GET',
        url: 'http://5.130.78.41:27020/api/deal/all',
      },
      { fixture: 'services.json' }
    ).as('deals')
  })

  it('signup', () => {
    cy.signup()
  })
})
