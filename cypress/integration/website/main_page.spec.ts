/// <reference types = "cypress"/>

import { goToPageAndBack, chooseOriginDestination, checkPassenger, chooseDate, chooseTime, visitNewSite } from '../../page-objects/newsite/main_page'

describe('new site-> main page', () => {
    beforeEach(() => {
        if (Cypress.env('CI')==1){
            cy.visit(Cypress.env('website_home_page'), { timeout: 3000000 })
        }
        else{
            visitNewSite(Cypress.env('website_home_page'));
        }
    })
    it('C55 check text', () => {
        cy.contains('Relax.')
        cy.contains('Experience the freedom of traveling door-to-door on your own schedule')
        cy.contains('Optional sight-seeing')
        cy.contains('It starts with convenience')
        cy.contains("And a dedication to safety")
    })
    it('C54 check buttons', () => {
        //check all buttons
        goToPageAndBack('All routes', 'Select a country')
        goToPageAndBack('Company', 'Daytrip was founded in 2015')
            //check route
        goToPageAndBack('Discover', 'Discover the world with Daytrip')
        goToPageAndBack('Blog', "")
            //check terms
        goToPageAndBack('Terms of use', 'KEY DEFINITIONS')
        goToPageAndBack('Privacy policy', 'This is Privacy Policy of DAYTRIP EUROPE')
    })
    it('C56 fill trip info', () => {
        //type pra
        chooseOriginDestination(0, 'prague', 'Prague')
            //type berl
        chooseOriginDestination(1, 'berlin', 'Berlin')
            //add passenger info
        checkPassenger(1, 1, 1)
            //add date
        chooseDate(1, 25, "select")
            //add time
        chooseTime(":00 AM")
            //book trip
        cy.contains('Search').first().click()
        cy.contains('Route')
    })
})