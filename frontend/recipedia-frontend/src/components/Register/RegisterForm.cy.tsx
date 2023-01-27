import * as React from 'react';  
import {BrowserRouter as Router} from 'react-router-dom';   
import RegisterForm from './RegisterForm'

describe('RegisterForm component', () => {
  beforeEach(() => {
    // render before tests
    cy.viewport(1920, 1080)
    cy.mount(
      <Router>      
         <RegisterForm/>
      </Router>
    ); 
  }),
  it('Check fields initialization', () => {
    cy.get('#firstname').should('have.text', '')
    cy.get('#firstname').should('have.attr', 'required')
    cy.get('#lastname').should('have.text', '')
    cy.get('#lastname').should('have.attr', 'required')
    cy.get('#username').should('have.text', '')
    cy.get('#username').should('have.attr', 'required')
    cy.get('#email').should('have.text', '')
    cy.get('#email').should('have.attr', 'required')
    cy.get('#password1').should('have.text', '')
    cy.get('#password1').should('have.attr', 'required')
    cy.get('#password2').should('have.text', '')
    cy.get('#password2').should('have.attr', 'required')
  }),
  it('Check submit no data', () => {
    cy.get('[data-cy=submit]').should('have.text', 'Register')
    cy.get('[data-cy=submit]').click()
  }),
  it('Check field username validation', () => {
    cy.get('#firstname').type('Firstname')
    cy.get('#lastname').type('Lastname')
    cy.get('#username').type('user@name')
    cy.get('#email').type('email@mail.com')
    cy.get('#password1').type('Password123')
    cy.get('#password2').type('Password123')

    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=error-msg').should('have.text', "The username cannot include '@' character.")
  }),
  it('Check field email validation', () => {
    cy.get('#firstname').type('Firstname')
    cy.get('#lastname').type('Lastname')
    cy.get('#username').type('username')
    cy.get('#email').type('email.com')
    cy.get('#password1').type('Password123')
    cy.get('#password2').type('Password123')

    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=error-msg').should('have.text', "Email is incorrect.")
  
    cy.get('#email').clear()
    cy.get('#email').type('email@mail')
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=error-msg').should('have.text', "Email is incorrect.")
  
  }),
  it('Check field password validation', () => {
    cy.get('#firstname').type('Firstname')
    cy.get('#lastname').type('Lastname')
    cy.get('#username').type('username')
    cy.get('#email').type('email@mail.com')
    cy.get('#password1').type('password')
    cy.get('#password2').type('differentpass')

    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=error-msg').should('have.text', "Your passwords do not match.")
  
    cy.get('#password2').clear()
    cy.get('#password2').type('password')
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=error-msg').should('have.text', "The password should have minimum 8 characters, at least one uppercase letter, one lowercase letter and one number.")
  }),
  it('Check field password validation', () => {
    cy.get('#firstname').type('Firstname')
    cy.get('#lastname').type('Lastname')
    cy.get('#username').type('username')
    cy.get('#email').type('email@mail.com')
    cy.get('#password1').type('password')
    cy.get('#password2').type('differentpass')

    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=error-msg').should('have.text', "Your passwords do not match.")
  
    cy.get('#password2').clear()
    cy.get('#password2').type('password')
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=error-msg').should('have.text', "The password should have minimum 8 characters, at least one uppercase letter, one lowercase letter and one number.")
  }),
  it('Check profile picture field', () => {
    cy.get('#firstname').type('Firstname')
    cy.get('#lastname').type('Lastname')
    cy.get('#username').type('username')
    cy.get('#email').type('email@mail.com')
    cy.get('#password1').type('Password123')
    cy.get('#password2').type('Password123')

    cy.get('input[type=file]').selectFile('cypress/fixtures/hammy.png', { force: true })
  }),
  it('Check account creation', () => {
    let currentdate = new Date();
    cy.get('#firstname').type('Firstname')
    cy.get('#lastname').type('Lastname')
    cy.get('#username').type(
      'username' 
      + currentdate.getFullYear().toString()
      + currentdate.getMonth().toString()
      + currentdate.getDay().toString()
      + currentdate.getTime().toString()
    )
    cy.get('#email').type('email@mail.com')
    cy.get('#password1').type('Password123')
    cy.get('#password2').type('Password123')

    cy.get('input[type=file]').selectFile('cypress/fixtures/hammy.png', { force: true })
    cy.get('[data-cy=submit]').click()
    cy.url().should('include', '/login') // user should have been redirected to login

  })
});