describe('Announcements', () => {
	before('Register', () => {
		cy.visit('/');
		homePage.goToRegister()
		registerPage.registerUser({name: randomUsername, email: randomEmail, password: randomPassword, confirmationPAssword: randomPassword })
		cy.wait(15000)
	});
	beforeEach('login', () => {
		cy.clearCookies();
		cy.clearLocalStorage();
		cy.visit('/');
		homePage.goToLogin()
		loginPage.loginWithUser({ email: randomEmail, password: randomPassword })
		cy.wait(15000)
	});
	it('SM-01 | Validate create announcement', () => {
		const randomTitle = faker.commerce.productName()
		cy.interceptApi('GET', apiSM.getAnnouncements, 'getAnnouncement')
		cy.interceptApi('POST', apiSM.postAnnoucements, 'postAnnouncements')
		announcementPage.openCreateAnnouncement()
		cy.wait(10000)
		cy.wait('@postAnnouncements', { timeout: 20000 })
		announcementPage.get.coursesOptions().then($options => {
    		const randomCourseOption = Cypress._.sample($options.toArray());
  	  		cy.wrap({
   	  		 value: randomCourseOption.value,
     		 text: randomCourseOption.text.trim()
					}).as('courseSelected');
			announcementPage.completeFormAnnouncement({
				course: randomCourseOption.value,
				title: randomTitle,
				message: randomMessage,
				ageFrom: '20',
				ageTo: '25'
			})
		});
		cy.wait(10000)
		//todo: Validations
		cy.wait('@postAnnouncements', { timeout: 50000 })
		announcementPage.filterByTitle({ title: randomTitle })
		cy.wait(10000)
		cy.wait('@postAnnouncements', { timeout: 50000 })
		cy.findCellByText(1, 'Titulo').then(titleSaved => {
			expect(titleSaved.text()).to.include(randomTitle)
		})
		cy.findCellByText(1, 'Curso').then(courseSaved => {
			cy.get('@courseSelected').then(titleCourseSelected => {
				expect(courseSaved.text()).to.include(titleCourseSelected.text)
			})		
		})
		cy.findCellByText(1, 'Rango de Edad').then(ageRangeSaved => {
			expect(ageRangeSaved.text()).to.include('20 - 25 años')
		})
		cy.findCellByText(1, 'Estado').then(stateSaved => {
			expect(stateSaved.text()).to.include('Borrador')
		})
		cy.findCellByText(1, 'Fecha de Envío').then(dateSaved => {
			expect(dateSaved.text()).to.include(currentDate)
		})
		announcementPage.get.confirmationMessge().should('exist').and('contain', 'Comunicado creado correctamente.')
	});
	it('SM-03 | Validate deletle announcement', () => {
		const randomTitle = faker.commerce.productName()
		//todo: Precondition "Create announcement"
		cy.interceptApi('GET', apiSM.getAnnouncements, 'getAnnouncement')
		cy.interceptApi('POST', apiSM.postAnnoucements, 'postAnnouncements')
		announcementPage.openCreateAnnouncement()
		cy.wait(10000)
		cy.wait('@postAnnouncements', { timeout: 20000 })
		announcementPage.get.coursesOptions().then($options => {
    		const randomCourseOption = Cypress._.sample($options.toArray());
  	  		cy.wrap({
   	  		 value: randomCourseOption.value,
     		 text: randomCourseOption.text.trim()
					}).as('courseSelected');
			announcementPage.completeFormAnnouncement({
				course: randomCourseOption.value,
				title: randomTitle,
				message: randomMessage,
				ageFrom: '20',
				ageTo: '25'
			})
		});
		cy.wait(10000)
		cy.wait('@postAnnouncements', { timeout: 50000 })
		//todo: cancel deletle announcement
		announcementPage.filterByTitle({ title: randomTitle })
		cy.wait(15000)
		cy.wait('@postAnnouncements', { timeout: 50000 })
		announcementPage.openModalDeletleAnnoucement()
		announcementPage.cancelActionModalOpen()
		cy.wait(5000)
		cy.wait('@postAnnouncements', { timeout: 50000 })
		cy.findCellByText(1, 'Titulo').then(titleSaved => {
			expect(titleSaved.text()).to.include(randomTitle)
		})
		//todo: confirm deletle announcement
		announcementPage.openModalDeletleAnnoucement()
		announcementPage.confirmActionModalOpen()
		cy.wait(15000)
		announcementPage.get.rowEmpty().should('exist').and('contain', 'No hay comunicados disponibles')
		announcementPage.get.confirmationMessge().should('exist').and('contain', 'Comunicado eliminado correctamente.')
	});
	it('SM-05 | Validate change satus of announcement to send', () => {
		//todo: precondition "Create announcement"
		const randomTitle = faker.commerce.productName()
		cy.interceptApi('GET', apiSM.getAnnouncements, 'getAnnouncement')
		cy.interceptApi('POST', apiSM.postAnnoucements, 'postAnnouncements')
		announcementPage.openCreateAnnouncement()
		cy.wait(10000)
		cy.wait('@postAnnouncements', { timeout: 20000 })
		announcementPage.get.coursesOptions().then($options => {
    		const randomCourseOption = Cypress._.sample($options.toArray());
  	  		cy.wrap({
   	  		 value: randomCourseOption.value,
     		 text: randomCourseOption.text.trim()
					}).as('courseSelected');
			announcementPage.completeFormAnnouncement({
				course: randomCourseOption.value,
				title: randomTitle,
				message: randomMessage,
				ageFrom: '20',
				ageTo: '25'
			})
		});
		cy.wait(15000)
		//todo: Validate announcement created in status draft
		cy.wait('@postAnnouncements', { timeout: 50000 })
		announcementPage.filterByTitle({ title: randomTitle })
		cy.wait(15000)
		cy.wait('@postAnnouncements', { timeout: 50000 })
		cy.findCellByText(1, 'Titulo').then(titleSaved => {
			expect(titleSaved.text()).to.include(randomTitle)
		})
		cy.findCellByText(1, 'Estado').then(stateSaved => {
			expect(stateSaved.text()).to.include('Borrador')
		})
		//todo: Change announcement to status sent
		announcementPage.sendAnnouncement()
		cy.wait(15000)
		cy.wait('@postAnnouncements', { timeout: 50000 })
		announcementPage.get.confirmationSendMessge().should('exist').and('contain', 'Comunicado enviado correctamente. No se encontraron destinatarios que cumplan con los criterios.')
		cy.findCellByText(1, 'Estado').then(stateSaved => {
			expect(stateSaved.text()).to.include('Enviado')
		})
		//todo: Validate that send button not exist
		announcementPage.get.sendActionButton().should('not.exist')
	});
});

import apiSM from '../../fixtures/apis.json'
import { announcementPage } from '@pages/announcements.Page';
import { removeLogs } from '@helper/removeLogs';
import { faker } from '@faker-js/faker';
import { homePage } from '@pages/home.Page';
import { registerPage } from '@pages/register.Page';
import { loginPage } from '@pages/login.Page';

const randomEmail = faker.internet.email().toLowerCase()
const randomUsername = faker.name.firstName()
const randomPassword = faker.internet.password()
const randomMessage = faker.company.name()
const fecha = new Date();
const day = fecha.getDate().toString().padStart(2, '0');
const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
const year = fecha.getFullYear().toString();
const currentDate = `${day}/${month}/${year}`;

removeLogs();