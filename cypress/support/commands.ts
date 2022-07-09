/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

export {}

declare global {
  namespace Cypress {
    interface Chainable {
      signup(): Chainable<void>
    }
  }
}

Cypress.Commands.addAll({
  signup() {
    cy.visit('/')

    cy.get('[data-cy=toSignupRoute]').click()

    cy.get('[data-cy=firstName]').type('Никита').blur()
    cy.get('[data-cy=lastName]').type('Бабеев').blur()
    cy.get('[data-cy=middleName]').type('Александрович').blur()
    cy.get('[data-cy=nextStageButton]').click()

    cy.get('[data-cy=number]').type('80000000000').blur()
    cy.get('[data-cy=nextStageButton]').click()

    cy.get('[data-cy=code]').type('1234').blur()
    cy.get('[data-cy=submitSignup]').click()
  },
})
