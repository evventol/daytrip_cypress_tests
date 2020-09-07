/// <reference types = "cypress"/>

import { goToPageAndBack, chooseOriginDestination, checkPassenger, chooseDate, chooseTime,visitNewSite } from '../../page-objects/newsite/main_page.js'

describe('new site-> main page', () => {
    beforeEach(() => {
        visitNewSite('https://website.staging.mydaytrip.net/')
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
        /*discover page doesn't exist*/
        goToPageAndBack('Company', 'travelling to another city')
        //check route
        goToPageAndBack('Budapest to Vienna', '404')
        //check terms
        goToPageAndBack('Terms of use', 'KEY DEFINITIONS')
        goToPageAndBack('Privacy policy', 'This is Privacy Policy of DAYTRIP EUROPE')
    })
    it('C56 fill trip info', () => {
        //type pra
        chooseOriginDestination(0, 'pra', 'Prague')
        //type berl
        chooseOriginDestination(1, 'berl', 'Berlin')
        //add passenger info
        checkPassenger(1,1,1)
        //add date
        chooseDate(1, 25)
        //add time
        chooseTime()
        //book trip
        cy.contains('Search').first().click()
        cy.contains('Search routes')
    })
})