/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('interceptApi', (methods, endpoint, alias) => {
  cy.intercept(methods, endpoint).as(alias);
});
Cypress.Commands.add('findCellByText', (rowIndex, textC) => {
	let indexValue = [];
	cy.get('th')
		.each(($th, index) => {
			cy.wrap($th)
				.invoke('text')
				.then(text => {
					if (text.includes(textC)) {
						indexValue = index;
					}
				});
		})
		.then(() => {
			cy.get('tr').eq(rowIndex).children('td').eq(indexValue);
		});
});