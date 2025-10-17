describe('happy path', () => {
  it('creates and rates an article', () => {
    cy.intercept('GET', '**/api/categories', [
      {
        id: 'technology',
        name: 'Technology',
        subcategories: [{ id: 'frontend', name: 'Frontend' }],
      },
      { id: 'health', name: 'Health' },
      { id: 'travel', name: 'Travel' },
    ]).as('categories');

    cy.intercept('POST', '**/api/articles', (req) => {
      req.reply({
        statusCode: 201,
        headers: { 'content-type': 'application/json' },
        body: {
          id: '777',
          title: req.body.title,
          body: req.body.body,
          category: req.body.category,
          subcategory: req.body.subcategory ?? null,
          rating: 0,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      });
    }).as('create');

    let currentRating = 0;

    cy.intercept('GET', '**/api/articles/777', (req) => {
      req.reply({
        headers: { 'content-type': 'application/json' },
        body: {
          id: '777',
          title: 'Cypress Article',
          body: 'Body Body Body Body Body Body',
          category: 'technology',
          subcategory: 'frontend',
          rating: currentRating,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      });
    }).as('getArticle');

    cy.intercept('POST', '**/api/articles/777/rate', (req) => {
      currentRating = req.body.rating;
      req.reply({
        headers: { 'content-type': 'application/json' },
        body: {
          id: '777',
          title: 'Cypress Article',
          body: 'Body Body Body Body Body Body',
          category: 'technology',
          subcategory: 'frontend',
          rating: currentRating,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      });
    }).as('rate');

    cy.visit('/articles/new');
    cy.wait('@categories');

    cy.findByLabelText(/title/i).type('Cypress Article');
    cy.findByLabelText(/body/i).type('Body Body Body Body Body Body');
    cy.findByLabelText(/^category$/i).select('Technology');
    cy.findByLabelText(/^subcategory$/i).select('Frontend');

    cy.findByRole('button', { name: /save/i }).click();
    cy.wait('@create');
    cy.wait('@getArticle');

    cy.get('.star').eq(3).click();
    cy.wait('@rate');
    cy.wait('@getArticle');

    cy.get('.star.active').should('have.length', 4);
    cy.findByRole('heading', { name: /cypress article/i }).should(
      'exist'
    );
  });
});
