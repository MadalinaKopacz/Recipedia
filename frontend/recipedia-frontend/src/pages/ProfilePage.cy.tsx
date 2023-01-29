import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import ProfilePage from './ProfilePage'

describe('<ProfilePage />', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)

    // login 
    cy.visit('/login')
    cy.get('#username').type('testuser')
    cy.get('#password').type('Parola123')
    cy.get('[data-cy=submit]').click()
    cy.url().should('include', '/profile')
    
  }),
  it('Check fields initialization', () => {
    cy.get('#firstname').should('have.text', '')
  })
})