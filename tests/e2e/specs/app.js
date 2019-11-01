// https://docs.cypress.io/api/introduction/api.html

describe('App', () => {
  it('Account', () => {
    cy.visit('/');
    cy.contains('h1', 'List of accounts');
  });
});
