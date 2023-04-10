import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import { AuthProvider } from '../App';

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

describe('<ProfilePage />', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);

    // Register and log in the test user, and mount the component
    registerUser().then(() => {
      loginUser().then(() => {
        // Mount the component after the user is logged in
        cy.mount(<Router><AuthProvider><ProfilePage /></AuthProvider></Router>);
      });
    });
  });

  it('renders the profile picture, name, and details', () => {
    cy.get('[data-cy="avatar"]')
      .should('exist')
      .and('be.visible');

    cy.get('[data-cy="nume-prenume"]')
      .contains("TestPrenume TestNume")
      .should('exist')
      .and('be.visible');

    cy.get('[data-cy="username"]')
      .contains(/Username: testUsername/i)
      .should('exist')
      .and('be.visible');

    cy.get('[data-cy="email"]')
      .contains(/Email: testEmail@example.com/i)
      .should('exist')
      .and('be.visible');
  });

  it('renders health preferences and diet preferences', () => {

    cy.get('[data-cy="health-pref"]')
      .contains("Health Preferences")
      .should('exist')
      .and('be.visible');

    cy.get('[data-cy="diet-pref"]')
      .contains("Diet Preferences")
      .should('exist')
      .and('be.visible');
  });

  it('renders the edit profile, change password, and delete account buttons', () => {
    cy.get('[data-cy="edit-profile"]')
      .contains("Edit Profile")
      .should('exist')
      .and('be.visible');

    cy.get('[data-cy="change-password"]')
      .contains("Change Password")
      .should('exist')
      .and('be.visible');

    cy.get('[data-cy="delete-account"]')
      .contains("Delete Account")
      .should('exist')
      .and('be.visible');
  });

  it('renders the favorite recipes section', () => {
    cy.get('[data-cy="favorites-text"]')
      .contains("Favorites")
      .should('exist')
      .and('be.visible');
  });


  it('successfully saves health and diet preferences', () => {
    const healthTag = 'vegan';
    const dietTag = 'low-carb';

    cy.wait(500).get('[data-cy="autocomplete-health"]').type(`${healthTag}{enter}`).should("have.length", 1);

    cy.wait(500).get('[data-cy="autocomplete-diet"]').type(`${dietTag}{enter}`).should("have.length", 1);

    cy.wait(500).get('[data-cy="save"]')
      .click();

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Preferences saved');
    });

    // Check if the health and diet preferences are updated
    cy.get('[data-cy="chip-health"]').contains(healthTag).should('exist').and('be.visible');
    cy.get('[data-cy="chip-diets"]').contains(dietTag).should('exist').and('be.visible');
  });
});
