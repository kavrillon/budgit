const baseUrl = Cypress.config().baseUrl;

describe('Displaying board list', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('on init', () => {
    it('should load boards', () => {
      cy.get('[data-test="boardList"]')
        .find('[data-test="boardSummary"]')
        .should('have.length', 2);
    });
  });

  describe('on item click', () => {
    it('should redirect to board page', () => {
      cy.get('[data-test="boardSummary"]')
        .first()
        .click();

      cy.url().should('eql', baseUrl + 'board/0');
    });
  });
});
