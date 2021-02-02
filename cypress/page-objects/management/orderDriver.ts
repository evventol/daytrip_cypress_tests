/// <reference types = "cypress"/>
export class orderDriver {
    acceptVehicle() {
        cy.contains('accept',{timeout:10000}).click()
        this.chooseVehicle()
        cy.contains(' save').click()
    }
    acceptDriver() {
        cy.contains('accept',{timeout:30000}).click()
        this.chooseDriver('TestY Test')
        this.chooseVehicle()
        cy.contains(' save').click()
    }
    chooseDriver(name:string) {
        cy.get('.Select-placeholder').first().click()
        cy.contains(name).click()
    }
    chooseVehicle() {
        cy.get('.Select-placeholder').first().click()
        cy.get('.Select-option').first().click()
    }
    changeVehicle() {
        cy.contains('change vehicle',{timeout:10000}).click()
        cy.get('.Select-placeholder').click()
        cy.get('.Select-option').last().click()
        cy.get('.Select-placeholder').click()
        cy.get('.Select-option').first().click()
        cy.get('.Select-placeholder').click()
        cy.get('.Select-option').first().click()
        cy.contains(' save').click()
    }
}
