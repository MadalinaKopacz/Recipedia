import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../App';
import Introduction from './Introduction';

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

describe('<Introduction />', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);

        // Register and log in the test user, and mount the component
        registerUser().then(() => {
            loginUser().then(() => {
                // Mount the component after the user is logged in
                cy.mount(<Router><AuthProvider><Introduction /></AuthProvider></Router>);
            });
        });
    });
    it('renders the component and displays the expected elements', () => {
        cy.get('img').should('have.length', 3);
        cy.contains('Try now').should('be.visible');
        cy.contains('Get an account').should('be.visible');
        cy.contains('Receive delicious recipes ideas when you...').should('be.visible');
        cy.contains('are out of inspiration').should('be.visible');
        cy.contains('Step 1').should('be.visible');
        cy.contains('Step 2').should('be.visible');
        cy.contains('Step 3').should('be.visible');
    });
});