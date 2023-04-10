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
describe('e2e', () => {
  it('app flow-profile', () => {
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:3000/')
    cy.get('#register').click()

    cy.get('#firstname').type('Firstname')
    cy.get('#lastname').type('Lastname')
    cy.get('#username').type('testusernameforhammy')
    cy.get('#email').type('testemailforhammy@mail.com')
    cy.get('#password1').type('Parola123')
    cy.get('#password2').type('Parola123')

    cy.get('input[type=file]').selectFile('cypress/fixtures/hammy.png', { force: true })
    cy.get('[data-cy=submit]').click()
    cy.url().should('include', '/login') // user should have been redirected to login


    cy.get('#username').type('testusernameforhammy')
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

});



describe('e2e1', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    registerUser().then(() => {
      loginUser().then(() => {
        cy.visit('http://localhost:3000/');
      });
    });
  });
  it('app flow-recipes', () => {
    cy.contains('Home').click();
    cy.url().should('include', '/');

    cy.contains('Get Recipes').click();
    cy.url().should('include', '/ingredients');

    //Logout user
    cy.contains('Logout').click();
    cy.window().then((win) => {
      expect(win.localStorage.getItem('userToken')).to.equal('null');;
    });

    // Log the user back in
    loginUser().then(() => {
      // Test for RecipeCard components
      cy.visit('http://localhost:3000/');
      cy.get('[data-cy="recipe-card"]').its('length').should("eq", 20);

      //Known recipe id
      cy.get('[data-cy="recipe-card"]').first().then(($card) => {
        const recipeUri = $card.attr('data-uri');
        const recipeId = recipeUri?.substring(recipeUri.lastIndexOf("_") + 1);
        cy.visit(`http://localhost:3000/recipe/${recipeId}`);
      });
      cy.get('[data-cy="recipe-body"]').should('be.visible');

      //Unknown recipe id
      cy.visit(`http://localhost:3000/recipe/recipecard1`);
      cy.contains('Sorry')

      cy.contains('Home').click();
      cy.get('[data-cy="recipe-card"]').its('length').should("eq", 20);

    });
  });

});