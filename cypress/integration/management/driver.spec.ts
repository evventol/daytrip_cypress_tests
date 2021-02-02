/// <reference types = "cypress"/>
import { Login } from "../../page-objects/management/login";
import { Driver } from "../../page-objects/management/driver";
import { Navigation } from "../../page-objects/management/navigation";
describe("Smoke management", () => {
    const login = new Login();
    const navig = new Navigation();
    const driver = new Driver();
    let locatoins=[["bramber", "Bramberg, Austria", "min"]]
    let vehicle=["sedan","Mpv","Van"]
    beforeEach(() => {
        cy.visit(Cypress.env('login_management'), { timeout: 1200000 });

    });
    it("Create driver", () => {
        login.managerRoot()
        cy.visit(Cypress.env('login_management')+'drivers', { timeout: 1200000 });
        driver.createDriver()
        driver.activiteDriver()
        driver.editDriver()
        driver.removeDriver()
    })
    it.skip("Create BI",()=>{
        login.managerRoot()
        cy.visit(Cypress.env('login_management')+'drivers', { timeout: 1200000 });
        driver.createDriver()
        cy.wait(1000)
        driver.createNewBI(0,"United States")
        cy.get('._2Mg2sOHh_RwI78WmpEU0ku').contains('Profile').click()
        driver.removeDriver()

    })
})