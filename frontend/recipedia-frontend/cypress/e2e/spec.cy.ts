describe('template spec', () => {
  it('app flow', () => {
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:3000/')
    cy.get('#register').click()

    cy.get('#firstname').type('Firstname')
    cy.get('#lastname').type('Lastname')
    cy.get('#username').type('testusernameforhammy1')
    cy.get('#email').type('testemailforhammy1@mail.com')
    cy.get('#password1').type('Parola123')
    cy.get('#password2').type('Parola123')

    cy.get('input[type=file]').selectFile('cypress/fixtures/hammy.png', { force: true })
    cy.get('[data-cy=submit]').click()
    cy.url().should('include', '/login') // user should have been redirected to login


    cy.get('#username').type('testusernameforhammy1')
    cy.get('#password').type('Parola123')
    cy.get('[data-cy=submit]').click()
    cy.get('#welcome-msg').should('exist')

    // profile flow
    cy.get("#btn-profile").click()
    cy.url().should('include', '/profile')

    // edit with wrong email
    cy.get("#btn-edit-profile").click()
    cy.get('#fname').type("Hammy")
    cy.get('#lname').type("Hammy")
    cy.get('#username').type("hammytest")
    cy.get('#email').type("hammytest")
    cy.get('input[type=file]').selectFile('cypress/fixtures/hammy2.png', { force: true })
    cy.get('#btn-save').click()

    cy.get('[data-cy=error-msg').should('have.text', "Email is incorrect.")
    cy.get('#email').type("@mail.com")
    cy.get('#btn-save').click()

    cy.get('[data-cy=username]').should('have.text', "Username: hammytest")
    cy.get('[data-cy=email]').should('have.text', "Email: hammytest@mail.com")

    cy.get('#change-pass').click()

    // test wrong old password
    cy.get('#old_pass').type("notcorrectpassword")
    cy.get('#new_pass1').type("Parola123")
    cy.get('#new_pass2').type("Parola123")
    cy.get('#btn-done').click()
    cy.get('[data-cy=error-msg]').should('have.text', "Reenter your old password")

    cy.get('#old_pass').clear()
    cy.get('#old_pass').type("Parola123")

    cy.get('#new_pass1').clear()
    cy.get('#new_pass1').type("parola")
    cy.get('#btn-done').click()
    cy.get('[data-cy=error-msg]').should('have.text', "New passwords does not match.")


    cy.get('#new_pass2').clear()
    cy.get('#new_pass2').type("parola")
    cy.get('#btn-done').click()
    cy.get('[data-cy=error-msg]').should('have.text', "The password should have minimum 8 characters, at least one uppercase letter, one lowercase letter and one number.")



    cy.get('#new_pass2').clear()
    cy.get('#new_pass2').type("Parola123")
    cy.get('#new_pass1').clear()
    cy.get('#new_pass1').type("Parola123")
    cy.get('#btn-done').click()

    cy.get('#btn-del').click()
    cy.get('#acc-del').click()

    cy.url().should('equal', 'http://localhost:3000/')
    cy.get('#login').should('exist')
  })
})