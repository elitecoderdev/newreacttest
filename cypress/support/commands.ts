/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

Cypress.Commands.add(
  'loginAs',
  (roles: string[] = ['editor'], path: string = '/') => {
    const user = {
      id: 'u1',
      email: 'tester@example.com',
      name: 'Test User',
      roles,
    };
    const state = { token: 'mock-token', user };

    cy.visit(path, {
      onBeforeLoad(win) {
        win.localStorage.setItem('auth:v1', JSON.stringify(state));
      },
    });
  }
);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      loginAs(roles?: string[], path?: string): Chainable<void>;
    }
  }
}

export {};
