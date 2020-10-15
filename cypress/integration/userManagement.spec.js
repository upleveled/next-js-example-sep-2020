describe('User Management', () => {
  it('Allows User Following', () => {
    cy.visit('/users/user-list');

    cy.get(
      // Warning: This selector could lead to
      // a flaky test
      '[data-cy=user-list-follow-user-id-3]',
    )
      .should('be.visible')
      .contains('Follow')
      .click()
      .contains('Unfollow');

    cy.reload();

    cy.get('[data-cy=user-list-follow-user-id-3]')
      .contains('Unfollow')
      .click()
      .contains('Follow');
  });

  it('Allows User Creation', () => {
    cy.visit('/users/new');

    const date = Date.now();

    const user = {
      firstName: `Test User First Name ${date}`,
      lastName: `Test User Last Name ${date}`,
      city: `Test User City ${date}`,
    };

    cy.get('[data-cy=new-user-first-name-input]').type(user.firstName);
    cy.get('[data-cy=new-user-last-name-input]').type(user.lastName);
    cy.get('[data-cy=new-user-city-input]').type(user.city);

    cy.get('[data-cy=new-user-form-button]').click();

    cy.contains(user.firstName);
    cy.contains(user.lastName);
    cy.contains(user.city);

    cy.get('[data-cy=single-user-delete-button]').click();

    // Check that the URL matches "/users/user-list"
    cy.location('pathname').should('match', /\/users\/user-list$/);
  });
});
