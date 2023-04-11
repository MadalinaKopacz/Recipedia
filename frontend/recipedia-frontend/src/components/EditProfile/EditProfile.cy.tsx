import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../App';
import EditProfile from './EditProfile';


describe('<EditProfile />', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);

        cy.registerAndLogin(<Router><AuthProvider><EditProfile /></AuthProvider></Router>);

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
