import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../App';
import Introduction from './Introduction';


describe('<Introduction />', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);

        // Register and log in the test user, and mount the component

        cy.registerAndLogin(<Router><AuthProvider><Introduction /></AuthProvider></Router>);


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