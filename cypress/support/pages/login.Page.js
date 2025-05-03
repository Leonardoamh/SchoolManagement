class login {
	get = {
		emailInput: () => cy.get('input[id="email"]'),
		passwordInput: () => cy.get('input[id="password"]'),
		submitButton: () => cy.get('button[type="submit"]'),
	};
	loginWithUser({ email: val, password: val2 }) {
		this.get.emailInput().type(val);
		this.get.passwordInput().type(val2);
		this.get.submitButton().click();
	}
}
export const loginPage = new login();
