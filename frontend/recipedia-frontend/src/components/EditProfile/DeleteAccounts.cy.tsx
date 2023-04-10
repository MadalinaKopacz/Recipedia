import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../App';
import DeleteAccount from './DeleteAccounts';

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

describe('<DeleteAccount />', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);

        // Register and log in the test user, and mount the component
        registerUser().then(() => {
            console.log("aici")
            loginUser().then(() => {
                // Mount the component after the user is logged in
                cy.mount(<Router><AuthProvider><DeleteAccount /></AuthProvider></Router>);
            });
        });
    });

    it('should open and close the delete account modal', () => {
        cy.get('#btn-del').click();
        cy.get('[role="presentation"]').should('be.visible');
        cy.get('[data-cy="yes-button"]').should("be.visible");
        cy.get('[data-cy="no-button"]').should("be.visible");
        cy.get('[data-cy="no-button"]').click();
        cy.get('[role="presentation"]').should('not.exist');
    });

    it('should delete the user account and redirect to the homepage', () => {
        cy.intercept('DELETE', 'http://localhost:8000/user/delete_user/').as('deleteUser');

        cy.get('#btn-del').click();
        cy.get('[role="presentation"]').should('be.visible');
        cy.get('#acc-del').click();

        cy.wait('@deleteUser').then((interception) => {
            expect(interception.response?.statusCode).to.equal(200);
        });

    });

});
