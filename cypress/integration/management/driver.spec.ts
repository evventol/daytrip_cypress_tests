/// <reference types = "cypress"/>
import { Login } from "../../page-objects/management/login";
import { Driver } from "../../page-objects/management/driver";
import { Navigation } from "../../page-objects/management/navigation";
describe("Smoke management", () => {
    const login = new Login();
    const navig = new Navigation();
    const driver = new Driver();
    let countries: string[] = ['United State','Italy','India','Czech Republic',"Cambodia"]

    beforeEach(() => {
        cy.visit(Cypress.env('login_management'), { timeout: 1200000 });

    });
    it("Create driver & add vehicle", () => {
        login.managerRoot()
        cy.visit(Cypress.env('login_management')+'drivers', { timeout: 1200000 });
        driver.createDriver(countries[4])
        driver.activiteDriver()
        driver.editDriver()
        driver.addNewVehicle('Nissan','Juke')
        driver.removeDriver()
    })
    it("Create BI",()=>{
        login.managerRoot()
        cy.visit(Cypress.env('login_management')+'drivers', { timeout: 1200000 });
        driver.createDriver(countries[0])
        driver.createNewBI(1,countries[2])
        driver.removeDriver()
    })

})