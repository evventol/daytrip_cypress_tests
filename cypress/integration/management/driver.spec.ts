/// <reference types = "cypress"/>
import { Login } from "../../page-objects/management/login";
import { Driver } from "../../page-objects/management/driver";
import { Navigation } from "../../page-objects/management/navigation";
describe("Smoke management", () => {
    const login = new Login();
    const navig = new Navigation();
    const driver = new Driver();
    //country and IBAN = 0, ABA = 1
    let countries: any[][] = [['United State',1],['Italy',0],['India ',1],['Czech Republic',0],["Costa Rica",1]]

    beforeEach(() => {
        cy.visit(Cypress.env('login_management'), { timeout: 1200000 });

    });
    it("Create driver & add vehicle", () => {
        login.managerRoot()
        let i=0;
        for(i=0; i<countries.length;i++){
            cy.visit(Cypress.env('login_management')+'drivers', { timeout: 1200000 });
            driver.createDriver(countries[i][0])
            driver.activiteDriver()
            driver.editDriver()
            driver.addNewVehicle('Nissan','Juke')
            driver.removeDriver()
        }
    })
    it.only("Create BI",()=>{
        login.managerRoot()
        let i,j=0;
        for(i=0;i<2;i++){
            for(j=0;j<countries.length;j++){
                cy.visit(Cypress.env('login_management')+'drivers', { timeout: 1200000 });
                driver.createDriver(countries[j][0])
                driver.createNewBI(i,countries[j])
                driver.removeDriver()
            }
        }

    })
 it('test',()=>{
    login.managerRoot()
    cy.visit(Cypress.env('login_management')+'drivers', { timeout: 1200000 });
    driver.createDriver(countries[0][0])
    driver.createNewBI(1,countries[0])
    driver.removeDriver()
 })
})