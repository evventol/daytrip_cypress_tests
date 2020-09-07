/// <reference types = "cypress"/>
export class Assignation {
  assignDriver() {
    this.chooseTrip('Prague')
    this.assignPerson("Yev RM");
  }
  assignCompany() {
    cy.wait(5000)
    this.chooseTrip('Prague')
    this.assignPerson("Yev Test___Comp");
  }
  assignPerson(name) {
    cy.get('.aWVx7n4fOpKnlxaIVfpRw', { timeout: 50000 }).contains(name, { timeout: 50000 }).dblclick();
    cy.contains("Confirm assignation",{timeout:10000}).click();
    cy.wait(1000)
  }
  chooseTrip(name){
    cy.get('._27UCb35ugAf8QevQ0a7_H8', { timeout: 50000 }).contains(name).click({force: true})
  }
}
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})