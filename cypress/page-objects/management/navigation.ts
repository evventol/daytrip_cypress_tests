/// <reference types = "cypress"/>
/// <reference types = "cypress-xpath"/>
export class Navigation {
    goToOrderPage(number:number) {
        cy.visit(Cypress.env('login_management') + 'orders?sortBy=createdAt&sortDirection=-1', { timeout: 200000 })
        cy.xpath(`//*[@id="tableHolder"]/table/tbody/tr[${number}]/td[9]/a`).click()
    }
    goToNewOrderPage() {
        cy.visit(Cypress.env('login_management') + 'order?userId=1405a0db-6235-4d2d-99a0-8152005fa771', { timeout: 200000 })
        cy.contains("Basic info", { timeout: 60000 }).should("be.visible");

    }
    goToAssignationToolsPage() {
        cy.visit(Cypress.env('login_management') + 'driversAssignation?days=1&start=1637235420000', { timeout: 200000 })
    }
}