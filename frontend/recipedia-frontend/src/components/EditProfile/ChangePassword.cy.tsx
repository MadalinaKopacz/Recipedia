import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../App';
import ChangePassword from './ChangePassword';

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

    });
};

describe('<ChangePassword />', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);

        // Register and log in the test user, and mount the component
        registerUser().then(() => {
            loginUser().then(() => {
                // Mount the component after the user is logged in
                cy.mount(<Router><AuthProvider><ChangePassword /></AuthProvider></Router>);
            });
        });
    });

    it('should open and close the change password dialog', () => {
        cy.get('[data-cy=change-pass-btn]').click();
        cy.get('[data-cy=change-pass-dialog]').should('be.visible');
        cy.get('[data-cy=cancel-btn]').click();
        cy.get('[data-cy=change-pass-dialog]').should('not.exist');
    });

    it('should show error messages for empty fields', () => {
        cy.get('[data-cy=change-pass-btn]').click();
        cy.get('[data-cy=done-btn]').click();
        cy.get('[data-cy=error-msg1]').contains('This field is required.');
    });

    it('should show an error message for mismatched new passwords', () => {
        cy.get('[data-cy=change-pass-btn]').click();
        cy.get('#old_pass').type('Testuser12');
        cy.get('#new_pass1').type('Newpass123');
        cy.get('#new_pass2').type('NewPass1234');
        cy.get('[data-cy=done-btn]').click();
        cy.get('[data-cy=error-msg]').contains('New passwords does not match.');
    });

    it('should show an error message for an invalid new password', () => {
        cy.get('[data-cy=change-pass-btn]').click();
        cy.get('#old_pass').type('Testuser12');
        cy.get('#new_pass1').type('newpass');
        cy.get('#new_pass2').type('newpass');
        cy.get('[data-cy=done-btn]').click();
        cy.get('[data-cy=error-msg]').contains(
            'The password should have minimum 8 characters, at least one uppercase letter, one lowercase letter and one number.'
        );
    });
});
