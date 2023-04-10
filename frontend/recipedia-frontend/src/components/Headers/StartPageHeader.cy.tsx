import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../App';
import ResponsiveAppBar from './StartPageHeader';

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

describe('<ResponsiveAppBar />', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
    });

    it('Renders without user logged in', () => {
        cy.mount(
            <Router>
                <AuthProvider>
                    <ResponsiveAppBar />
                </AuthProvider>
            </Router>
        );

        cy.get('#login').should('be.visible');
        cy.get('#register').should('be.visible');
    });

    it('Renders with user logged in', () => {
        registerUser().then(() => {
            loginUser().then(() => {
                cy.mount(
                    <Router>
                        <AuthProvider>
                            <ResponsiveAppBar />
                        </AuthProvider>
                    </Router>
                );

                cy.get('#welcome-msg').should('be.visible');
                cy.get('#btn-profile').should('be.visible');
                cy.contains('Logout').should('be.visible');
            });
        });
    });

    it('Logs out the user', () => {
        registerUser().then(() => {
            loginUser().then(() => {
                cy.mount(
                    <Router>
                        <AuthProvider>
                            <ResponsiveAppBar />
                        </AuthProvider>
                    </Router>
                );

                cy.contains('Logout').should('exist');
                cy.contains('Logout').click();
            });
        });
    });
});