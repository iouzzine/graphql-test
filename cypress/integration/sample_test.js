/// <reference types="cypress" />

// describe('My First Test', function() {
//   it('Visit home page && Click on LOGIN button', function() {
//     cy.visit('http://localhost:3000/');

//     cy.get('#loginModal');
//   });
// });

it('Visit home Page', () => {
  cy.visit('http://localhost:3000');
});

describe('Register', () => {
  it('Open Modal', () => {
    cy.get('#registerModal').click();
  });

  it('Registre User', () => {
    cy.get('form').within($form => {
      cy.get('input[name="email"]')
        .type('tes32@gmail.com')
        .as('email');
      cy.get('input[name="username"]')
        .type('test3')
        .as('username');
      cy.get('input[name="password"]')
        .type('Test@1337')
        .as('password');
      cy.get('input[name="passwordConfirm"]').type('Test@1337');

      cy.root().submit();
    });
  });
});

// describe('Insert Login Input', () => {
//   it('Insert Email && Password', () => {
//     cy.get('form').within($form => {
//       cy.get('input[name="username"]').type('test');
//       cy.get('input[name="password"]').type('Test@1337');

//       cy.root().submit();
//     });
//   });
// });

// describe('Check Login', () => {
//   it('Check if logged', () => {
//     cy.contains('username:').then($el => {
//       const username = $el.text();
//       console.log('username', username);
//     });
//   });
// });
