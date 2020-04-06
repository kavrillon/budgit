const baseUrl = Cypress.config().baseUrl;

describe('Displaying board list', () => {
  describe('on init', () => {
    beforeEach(() => {
      cy.server();
    });

    describe('when data exists', () => {
      beforeEach(() => {
        cy.route({ url: '/api/boards', delay: 100 }).as('getBoards');
        cy.visit('/');
        cy.wait('@getBoards');
      });

      it('should load boards', () => {
        cy.get('[data-test="boardsList"]')
          .find('[data-test="boardSummary"]')
          .should('have.length', 2);
      });

      it('should not display the error', () => {
        cy.get('[data-test="pageError"]').should('not.exist');
      });

      it('should not be loading anymore', () => {
        cy.get('[data-test="pageLoading"]').should('not.exist');
      });
    });

    describe('when no data', () => {
      beforeEach(() => {
        cy.route({
          url: '/api/boards',
          response: {},
          status: 404,
        }).as('getBoards');
        cy.visit('/');
        cy.wait('@getBoards');
      });

      it('should display an error', () => {
        cy.get('[data-test="pageError"]').should('exist');
      });

      it('should not display content', () => {
        cy.get('[data-test="boardsList"]').should('not.exist');
      });

      it('should not be loading anymore', () => {
        cy.get('[data-test="pageLoading"]').should('not.exist');
      });
    });
  });

  describe('on item click', () => {
    it('should redirect to board page', () => {
      cy.visit('/');
      cy.get('[data-test="boardSummary"]').first().click();

      cy.url().should('eql', baseUrl + 'board/0');
    });
  });
});
