import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../App';
import EditProfile from './EditProfile';

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

describe('<EditProfile />', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);

        registerUser().then(() => {
            console.log("aici")
            loginUser().then(() => {
                cy.mount(<Router><AuthProvider><EditProfile /></AuthProvider></Router>);
            });
        });
    });

    it('Opens and closes the Edit Profile dialog', () => {
        cy.get('#btn-edit-profile').click();
        cy.get('[data-cy="dialog"]').should('be.visible');
        cy.get('#btn-cancel').click();
        cy.get('[data-cy="dialog"]').should('not.exist');
    });


    it('Shows an error when entering an incorrect email', () => {
        cy.get('#btn-edit-profile').click();
        cy.get('#email').type('invalid-email');
        cy.get('#btn-save').click();
        cy.get('[data-cy=error-msg]').should('be.visible').and('contain', 'Email is incorrect.');
    });

});
