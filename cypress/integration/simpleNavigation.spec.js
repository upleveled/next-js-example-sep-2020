describe('Simple Website Navigation', () => {
  it('Header navigation works', () => {
    // Navigate to the homepage
    cy.visit('/');

    // Verify that the homepage content is on the page
    cy.contains('Some page content on the homepage');

    // Click on the User List link in the Header
    cy.get(
      // CSS selector
      '[data-cy=header-link-user-list]',
    ).click();

    // Test if the user list page description element
    // is visible
    cy.get('[data-cy=user-list-page-description]')
      // Both of `should` and `be.visible` are defined
      // by the test framework
      .should('be.visible');

    // Test whether the title has been set correctly
    cy.title().should('eq', 'User list');
  });

  it('Manual navigation works', () => {
    cy.visit('/');
    cy.visit('/users');
    cy.title().should('eq', 'Users');
    cy.visit('/users/new');
    cy.title().should('eq', 'New User');
    cy.get('[data-cy=new-user-first-name-input]').should('be.visible');
  });
});
