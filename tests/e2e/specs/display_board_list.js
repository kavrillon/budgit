const baseUrl = Cypress.config().baseUrl;

describe('Displaying board list', () => {
  describe('on init', () => {
    beforeEach(() => {
      cy.server();
    });

    describe('initial state', () => {
      it('should be loading', () => {
        cy.route({ url: '/data/boards.json', delay: 100 }).as('getBoards');
        cy.visit('/');
        cy.get('[data-test="boardLoading"]').should('exist');
      });
    });

    describe('when data exists', () => {
      beforeEach(() => {
        cy.route({ url: '/data/boards.json', delay: 100 }).as('getBoards');
        cy.visit('/');
        cy.wait('@getBoards');
      });

      it('should load boards', () => {
        cy.get('[data-test="boardList"]')
          .find('[data-test="boardSummary"]')
          .should('have.length', 2);
      });

      it('should not display the error', () => {
        cy.get('[data-test="boardError"]').should('not.exist');
      });

      it('should not be loading anymore', () => {
        cy.get('[data-test="boardLoading"]').should('not.exist');
      });
    });

    describe('when no data', () => {
      beforeEach(() => {
        cy.route({
          url: '/data/boards.json',
          response: {},
          status: 404,
        }).as('getBoards');
        cy.visit('/');
        cy.wait('@getBoards');
      });

      it('should display an error', () => {
        cy.get('[data-test="boardError"]').should('exist');
      });

      it('should not display content', () => {
        cy.get('[data-test="boardList"]').should('not.exist');
      });

      it('should not be loading anymore', () => {
        cy.get('[data-test="boardLoading"]').should('not.exist');
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
