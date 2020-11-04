/// <reference types = "cypress"/>
export class Login {
    managerRoot() {
        this.enterCredentials('evventol@gmail.com', 'gB8FqjkP')
        cy.contains('You can create payment request for the customer here.').should('be.visible')
    }
    driverRoot() {
        this.enterCredentials('ev.test.ve+3131@gmail.com', 'Q1')
        cy.contains('Waiting for your confirmation', { timeout: 150000 }).should('be.visible')
    }
    companyRoot() {
        this.enterCredentials('ev.test.ve+9696@gmail.com', 'L1yhL7LI')
        cy.contains('Waiting for your confirmation', { timeout: 150000 }).should('be.visible')
    }
    enterCredentials(email, passw) {
        //enter email
        cy.get('input[name="email"]', { timeout: 10000 }).type(email)
            //enter password
        cy.get('input[name="password"]', { timeout: 3000 }).type(passw)
            //log in
        cy.contains('log in', { timeout: 3000 }).click().should('be.visible')
    }
    unlogin() {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.reload()
    }
}