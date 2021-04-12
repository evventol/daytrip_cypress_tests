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
        cy.contains("Upcoming trip");
        cy.contains("Prague to Berlin");
        cy.contains("view details").first().click();
        cy.contains("Itinerary");
        cy.contains("Passengers");
        cy.contains("Your driver");
        cy.contains("Vehicle");
        cy.contains("Payment information");
        cy.contains(
          "If you want to make changes to your trip and aren't able to here, please contact us at sandbox@mydaytrip.com."
        );
        cy.contains("Booking reference:");
        cy.contains("Email address");
        cy.contains("Date of birth");
        cy.contains("Phone number");
    })
    it('create new TA',()=>{
    cy.visit(Cypress.env('website_home_page')+"travel-agent/register")
    cy.contains('Sign up').should('be.visible')
    cy.get('#first-name').type("yev")
    let rand=Math.floor(Math.random()*10000)
    cy.get('#last-name').type("TA"+rand.toString())
    cy.get('#email').type('ev.test.ve+ta'+rand+"@gmail.com")
    cy.get('#travel-agent-id').type('111111111')
    cy.get('button').contains("Sign up").click()
    cy.contains('Thanks for your application')
    })
    it('create new XO TA',()=>{
        cy.visit(Cypress.env('website_home_page')+'partners/xoprivate')
        cy.contains('Partner with us now!').should('be.visible')
        cy.get('#first-name').type("yev")
        let rand=Math.floor(Math.random()*10000)
        cy.get('#last-name').type("TA"+rand.toString())
        cy.get('#email').type('ev.test.ve+ta'+rand+"@gmail.com")
        cy.get('input[value="XOPRIVATE"]').should('be.visible')
        cy.get('button').contains("Sign up").click()
        cy.wait(1000)
        cy.contains('Thanks for your application')
    })
})