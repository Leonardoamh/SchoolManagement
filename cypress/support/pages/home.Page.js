class home {
	get = {
		loginButton: () => cy.get('[data-flux-button="data-flux-button"]').contains('Iniciar sesión'),
		registerButton: () => cy.get('[data-flux-button="data-flux-button"]').contains('Registrarse'),
		announcementsOption: () => cy.get('[class*=ease-in-out]').contains('Comunicados'),
	};
	goToLogin() {
		this.get.loginButton().click()
	}
	goToRegister() {
		this.get.registerButton().click()
	}
	goToAnnouncements() {
		this.get.announcementsOption().click()
	}
}
export const homePage = new home();
