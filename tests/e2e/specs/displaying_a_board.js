describe('Displaying a board', () => {
  before(() => {
    // disabled for now, as there's no seed modification
    // cy.exec('yarn data:clean && yarn data:seeds1');
  });

  beforeEach(() => {
    cy.visit('/board/0');
  });

  describe('on init', () => {
    it('should display the current year', () => {
      cy.get('[data-test="dateSelectorValue"]').should(
        'have.text',
        new Date().getFullYear(),
      );
    });
  });
});
