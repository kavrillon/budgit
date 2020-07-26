const route = '/b/0';

describe('Displaying board', () => {
  describe('on init', () => {
    describe('when data exists', () => {
      before(() => {
        cy.server();
        cy.route({ url: '/api/boards', delay: 100 }).as('getBoard');
        cy.visit(route);
        cy.wait('@getBoard');
      });

      it('should load requested board', () => {
        cy.get('[data-test="boardDetailed"]').should('be.visible');
      });

      it('should display the board title', () => {
        cy.get('[data-test="pageTitle"]').should($el =>
          expect($el.text().trim()).to.equal('Test board'),
        );
      });

      it('should not display an error', () => {
        cy.get('[data-test="pageError"]').should('not.be.visible');
      });

      it('should not be loading anymore', () => {
        cy.get('[data-test="pageLoading"]').should('not.be.visible');
      });

      it('should display the current total', () => {
        cy.get('[data-test="boardTotal"]').should($el =>
          expect($el.text().trim()).to.equal('+1.234 €'),
        );
      });
    });

    describe('when no data', () => {
      beforeEach(() => {
        cy.server();
        cy.route({
          url: '/api/boards',
          response: {},
          status: 404,
        }).as('getBoards');
        cy.visit(route);
        cy.wait('@getBoards');
      });

      it('should display an error', () => {
        cy.get('[data-test="pageError"]').should('be.visible');
      });

      it('should not display the content', () => {
        cy.get('[data-test="pageContent"]').should('not.be.visible');
      });

      it('should display not be loading anymore', () => {
        cy.get('[data-test="pageError"]').should('be.visible');
      });
    });
  });
});
