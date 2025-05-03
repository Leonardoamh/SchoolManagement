class register {
	get = {
		nameInput: () => cy.get('input[id="name"]'),
		emailInput: () => cy.get('input[id="email"]'),
		passwordInput: () => cy.get('input[id="password"]'),
		confirmationPasswordInput: () => cy.get('input[id="password_confirmation"]'),
		submitButton: () => cy.get('button[type="submit"]'),
	};
	registerUser({ name: val, email: val2, password: val3, confirmationPAssword: val4 }) {
		this.get.nameInput().type(val);
		this.get.emailInput().type(val2)
		this.get.passwordInput().type(val3);
		this.get.confirmationPasswordInput().type(val4)
		this.get.submitButton().click();
	}
}
export const registerPage = new register();
