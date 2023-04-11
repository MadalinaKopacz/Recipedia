// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'


// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18'

const registerUser = () => {
  const formData = new FormData();
  formData.append('firstname', 'TestPrenume');
  formData.append('lastname', 'TestNume');
  formData.append('username', 'testUsername');
  formData.append('email', 'testEmail@example.com');
  formData.append('password', 'Testuser12');

  return cy.window().then((win) => {
    return win.fetch('http://localhost:8000/user/register/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log('Register response status:', response.status);
        return response.json();
      })
      .then((data) => {
        console.log('Register response data:', data);
      });
  });
};

const loginUser = () => {
  return cy.window().then((win) => {
    return win.fetch('http://localhost:8000/user/login/', {
      method: 'POST',
      body: JSON.stringify({ username: 'testUsername', password: 'Testuser12' }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json());
  }).then((response) => {
    // Store the authentication information, e.g., token or cookies
    window.localStorage.setItem('userToken', JSON.stringify(response.token));

    console.log(window.localStorage.getItem('userToken'))
  });
};

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount,
      registerAndLogin: (Element: JSX.Element) => void;
    }
  }
}

Cypress.Commands.add('mount', mount)

import React, { ComponentType } from 'react';
Cypress.Commands.add('registerAndLogin', (Element: JSX.Element) => {
  registerUser().then(() => {
    loginUser().then(() => {
      // Mount the component after the user is logged in
      cy.mount(Element);
    });
  });
});


// Example use:
// cy.mount(<MyComponent />)