/// <reference types = "cypress"/>
import { visitNewSite,loginAsCustomer } from '../../page-objects/newsite/main_page'
describe("website-> CI", () => {
    beforeEach(() => {
        if (Cypress.env('CI')==1){
            cy.visit(Cypress.env('website_home_page'), { timeout: 3000000 })
        }
        else{
            visitNewSite(Cypress.env('website_home_page'));
        }
    });
    it('check text CI',()=>{
        loginAsCustomer('ev.test.ve+1888@gmail.com','9EFFCC')

    })
})