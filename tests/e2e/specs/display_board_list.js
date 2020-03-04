const baseUrl = Cypress.config().baseUrl;

describe('Displaying board list', () => {
  describe('on init', () => {
    describe('initial state', () => {
      it('should be loading', () => {
        cy.server();
        cy.route({ url: '/data/boards.json', delay: 100 }).as('getBoards');
        cy.visit('/');
        cy.get('[data-test="boardLoading"]').should('be.visible');
      });
    });

    describe('data loading', () => {
      beforeEach(() => {
        cy.server();
        cy.route({ url: '/data/boards.json', delay: 100 }).as('getBoards');
        cy.visit('/');
        cy.wait('@getBoards');
      });

      it('should load boards', () => {
        cy.get('[data-test="boardList"]')
          .find('[data-test="boardSummary"]')
          .should('have.length', 2);
      });

      it('should not be loading anymore', () => {
        cy.get('[data-test="boardLoading"]').should('not.be.visible');
      });
    });
  });

  describe('on item click', () => {
    it('should redirect to board page', () => {
      cy.visit('/');
      cy.get('[data-test="boardSummary"]')
        .first()
        .click();

      cy.url().should('eql', baseUrl + 'board/0');
    });
  });
});
