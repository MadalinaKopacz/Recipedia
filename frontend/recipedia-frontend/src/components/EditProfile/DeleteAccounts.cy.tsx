import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../App';
import DeleteAccount from './DeleteAccounts';


describe('<DeleteAccount />', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.registerAndLogin(<Router><AuthProvider><DeleteAccount /></AuthProvider></Router>);
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
