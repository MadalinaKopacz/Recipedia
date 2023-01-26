import React from 'react'
import LoginForm from './LoginForm'

describe('LoginForm component', () => {
  beforeEach(() => {
    // render before tests
    cy.viewport(1920, 1080)
    cy.mount(<LoginForm />)
  }), 
  it('Check fields initialization', () => {
    cy.get('#username').should('have.text', '')
    cy.get('#username').should('have.attr', 'placeholder', 'Your username')
    cy.get('#username').should('have.attr', 'required')
    cy.get('#password').should('have.text', '')
    cy.get('#password').should('have.attr', 'placeholder', 'Your password')
    cy.get('#password').should('have.attr', 'required')

  }),
  it('Check submit no data', () => {
    cy.get('[data-cy=submit]').should('have.text', 'Login')
    cy.get('[data-cy=submit]').click()
  }),
  it('Check submit with nonexisting data', () => {
    cy.get('#username').type('thisusernamedoesntexist1234567')
    cy.get('#password').type('password')
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=error-msg]').should('have.text', 'Invalid credentials')
  })
  it('Check submit with good data', () => {
    cy.get('#username').type('testusername')
    cy.get('#password').type('parola123A')
    cy.get('[data-cy=submit]').click()
  })
})