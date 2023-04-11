import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../App';
import ResponsiveAppBar from './StartPageHeader';

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
        cy.registerAndLogin(<Router><AuthProvider><ResponsiveAppBar /></AuthProvider></Router>);
        cy.get('#welcome-msg').should('be.visible');
        cy.get('#btn-profile').should('be.visible');
        cy.contains('Logout').should('be.visible');
    });
    it('Logs out the user', () => {
        cy.registerAndLogin(<Router><AuthProvider><ResponsiveAppBar /></AuthProvider></Router>);
        cy.contains('Logout').should('exist');
        cy.contains('Logout').click();
    });
});

