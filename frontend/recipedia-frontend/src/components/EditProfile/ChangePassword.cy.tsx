import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../App';
import ChangePassword from './ChangePassword';

describe('<ChangePassword />', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);

        // Register and log in the test user, and mount the component
        cy.registerAndLogin(<Router><AuthProvider><ChangePassword /></AuthProvider></Router>);

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
