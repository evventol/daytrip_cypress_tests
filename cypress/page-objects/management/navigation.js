/// <reference types = "cypress"/>
export class Navigation {
    goToOrderPage(number) {
        cy.visit('https://management.sandbox.mydaytrip.com/#/orders?sortBy=createdAt&sortDirection=-1',{timeout:200000})
        cy.get('._39WTJV8Ti8isB1BQu2qTna',{timeout:5000}).eq(number).next().click()
    }
    goToNewOrderPage() {
        cy.visit('https://management.sandbox.mydaytrip.com/#/order?userId=1405a0db-6235-4d2d-99a0-8152005fa771',{timeout:200000})
        cy.contains("Basic info", { timeout: 60000 }).should("be.visible");

    }
    goToAssignationToolsPage() {
        cy.visit('https://management.sandbox.mydaytrip.com/#/driversAssignation?days=1&start=1637235420000',{timeout:200000})
    }
}