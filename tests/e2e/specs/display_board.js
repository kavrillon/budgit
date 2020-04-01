const route = '/board/0';

describe('Displaying board', () => {
  describe('on init', () => {
    describe('when data exists', () => {
      before(() => {
        cy.server();
        cy.route({ url: '/data/boards.json', delay: 100 }).as('getBoard');
        cy.visit(route);
        cy.wait('@getBoard');
      });

      it('should load requested board', () => {
        cy.get('[data-test="board"]').should('exist');
      });

      it('should not display an error', () => {
        cy.get('[data-test="boardError"]').should('not.exist');
      });

      it('should not be loading anymore', () => {
        cy.get('[data-test="boardLoading"]').should('not.exist');
      });

      it('should display the board title', () => {
        cy.get('[data-test="boardTitle"]').should('contain', 'Test board');
      });
    });

    describe('when no data', () => {
      beforeEach(() => {
        cy.server();
        cy.route({
          url: '/data/boards.json',
          response: {},
          status: 404,
        }).as('getBoards');
        cy.visit('/board/0');
        cy.wait('@getBoards');
      });

      it('should display an error', () => {
        cy.get('[data-test="boardError"]').should('exist');
      });

      it('should not display the content', () => {
        cy.get('[data-test="boardContent"]').should('not.exist');
      });

      it('should display not be loading anymore', () => {
        cy.get('[data-test="boardError"]').should('exist');
      });
    });
  });
});
