describe('error case', () => {
  it('shows not found for missing article', () => {
    cy.intercept('GET', '**/api/articles/99999', {
      statusCode: 404,
      body: 'Not found',
      headers: { 'content-type': 'text/plain' },
    }).as('missing');

    cy.visit('/articles/99999');
    cy.wait('@missing');
    cy.findByText(/not found/i).should('exist');
  });
});
