/// <reference types="cypress" />

describe('signup', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'POST',
        url: 'http://5.130.78.41:27020/api/add/user',
      },
      { fixture: 'auth.json' }
    ).as('signup')
  })

  it('signup', () => {
    cy.signup()
  })
})
