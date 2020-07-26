const baseUrl = Cypress.config().baseUrl;

describe('Displaying board list', () => {
  describe('on init', () => {
    beforeEach(() => {
      cy.server();
    });

    describe('when data exists', () => {
      beforeEach(() => {
        cy.route({ url: '/api/boards', delay: 100 }).as('getBoards');
        cy.visit('/b');
        cy.wait('@getBoards');
      });

      it('should load page title', () => {
        cy.get('[data-test="pageTitle"]').should($el =>
          expect($el.text().trim()).to.equal('Your boards (2)'),
        );
      });

      it('should load boards', () => {
        cy.get('[data-test="boardSummary"]').should('have.length', 2);
      });

      it('should not display the error', () => {
        cy.get('[data-test="pageError"]').should('not.be.visible');
      });

      it('should not be loading anymore', () => {
        cy.get('[data-test="pageLoading"]').should('not.be.visible');
      });
    });

    describe('when no data', () => {
      beforeEach(() => {
        cy.route({
          url: '/api/boards',
          response: {},
          status: 404,
        }).as('getBoards');
        cy.visit('/b');
        cy.wait('@getBoards');
      });

      it('should display an error', () => {
        cy.get('[data-test="pageError"]').should('be.visible');
      });

      it('should not display content', () => {
        cy.get('[data-test="boardsList"]').should('not.be.visible');
      });

      it('should not be loading anymore', () => {
        cy.get('[data-test="pageLoading"]').should('not.be.visible');
      });
    });
  });

  describe('on item click', () => {
    it('should redirect to board page', () => {
      cy.visit('/b');
      cy.get('[data-test="boardSummary"]').first().click();

      cy.url().should('eql', baseUrl + 'b/0');
    });
  });

  describe('on scroll', () => {
    it('should minimize the header', () => {
      cy.viewport(1200, 300); // Small viewport to have scrolling
      cy.visit('/b');
      cy.wait(1000); // Wait the end of loading
      cy.get('[data-test="pageHeader"]').then($header => {
        const height = parseInt($header.css('height').replace('px', ''), 10);
        cy.get('[data-test="pageScroller"]').scrollTo('bottom');
        cy.wait(161);

        cy.get('[data-test="pageHeader"]').then($newHeader => {
          expect(
            parseInt($newHeader.css('height').replace('px', ''), 10),
          ).to.be.lessThan(height);
        });
      });
    });
  });
});
