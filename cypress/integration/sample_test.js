/// <reference types="cypress" />

// describe('My First Test', function() {
//   it('Visit home page && Click on LOGIN button', function() {
//     cy.visit('http://localhost:3000/');

//     cy.get('#loginModal');
//   });
// });

describe('Get Website', () => {
  it('Visit home Page', () => {
    cy.visit('http://localhost:3000');
  });
});

describe('Open Login and Register Modal', () => {
  it('Open Login Modal', () => {
    cy.get('#loginModal').click();
  });

  it('Open Register Modal from login Modal', () => {
    cy.get('#registerLink').click();
  });

  it('Open Login Modal from Register Modal', () => {
    cy.get('#loginLink').click();
  });
});

describe('Insert Login Input', () => {
  it('Insert Email && Password', () => {
    cy.get('#username')
      .type('test')
      .should('have.value', 'test');
    cy.get('#password')
      .type('Test@1337')
      .should('have.value', 'Test@1337');

    cy.get('#buttonLogin').click();
  });
});

describe('Check Login', () => {
  it('Check if logged', () => {
    cy.contains('username:').then($el => {
      const username = $el.text();
      console.log('username', username);
    });
  });
});
