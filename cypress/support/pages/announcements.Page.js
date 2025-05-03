class announcement {
	get = {
		createAnnouncementButton: () => cy.get('[class*=justify-between][class*=items-center] [class*=rounded-md][class*=bg-blue-500]'),
		titleInput: () => cy.get('input[id="title"]'),
		messageInput: () => cy.get('textarea[id="message"]'),
		dropdownCourse: () => cy.get('[id="course_id"]'),
		dropdownStatus: () => cy.get('[id="status"]'),
		ageFromInput: () => cy.get('input[id="age_from"]'),
		ageToInput: () => cy.get('input[id="age_to"]'),
		sendDateInput: () => cy.get('input[id="send_date"]'),
		submitButtom: () => cy.get('button[type="submit"]:not([class*="inline-flex"])'),
		submitCancelButtom: () => cy.get('button[type="submit"]'),
		cancelButtom: () => cy.get('button[type="button"]').contains('Cancelar'),
		confirmationMessge: () => cy.get('[class*=bg-green-100]'),
		confirmationSendMessge: () => cy.get('[class*=bg-green-100][class*=border-green-400]'),
		sendActionButton: () => cy.get('[class*=whitespace-nowrap] [class*=text-green-600]'),
		seeActionButton: () => cy.get('[class*=whitespace-nowrap] [class*=text-indigo-600').eq(0),
		editActionButton: () => cy.get('[class*=whitespace-nowrap] [class*=text-blue-600]').eq(0),
		deletleActionButton: () => cy.get('[class*=whitespace-nowrap] [class*=text-red-600]').eq(0),
		satusFilterDropdown: () => cy.get('[id="statusFilter"]'),
		titleFilterInput: () => cy.get('[id="search"]'),
		coursesOptions: () => cy.get('#course_id option:not([value=""])'),
		rowEmpty: () => cy.get('td[class*=text-gray-500]'),
	};
	openCreateAnnouncement() {
		this.get.createAnnouncementButton().click()
	}
	completeFormAnnouncement({ title: val, message: val2, course: val3, ageFrom: val4, ageTo: val5, satus: val6 }) {
		val && this.get.titleInput().type(val)
		val2 && this.get.messageInput().type(val2)
		val3 && this.get.dropdownCourse().select(val3)
		val4 && this.get.ageFromInput().type(val4)
		val5 && this.get.ageToInput().type(val5)
		val6 && this.get.dropdownStatus().select(val6)
		this.get.submitButtom().click()
	}
	cancelCreateAnnouncement() {
		this.get.cancelButtom().click()
	}
	sendAnnouncement() {
		this.get.sendActionButton().click()
	}
	openModalDeletleAnnoucement() {
		this.get.deletleActionButton().click()
	}
	cancelActionModalOpen() {
		this.get.cancelButtom().click()
	}
	confirmActionModalOpen() {
		this.get.submitCancelButtom().click()
	}
	filterByTitle({ title: val }) {
		this.get.titleFilterInput().type(val)
	}
}
export const announcementPage = new announcement();
