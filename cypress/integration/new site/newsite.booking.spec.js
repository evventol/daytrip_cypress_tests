/// <reference types = "cypress"/>

import { fillEmail,fillPassengerInfo,basicPayment } from '../../page-objects/newsite/booking.js'
import { visitNewSite } from '../../page-objects/newsite/main_page.js'
describe('new site-> booking page', () => {
    beforeEach(() => {
        visitNewSite('https://website.staging.mydaytrip.net/booking?adults=2&children=0&currency=0&departureAt=1655337600000&isOtherDirection=true&luggage=2&passengers=2&routeId=7c939590-b3ae-4523-92b6-44189180d13a&vehicles=0')
    })
    

    it('C149 check text', () => {
        cy.contains('Complete your booking')
        cy.contains('Trip summary')
        cy.contains('Why do people love')
    })
    it('C150 check trip summary', () => {
        cy.contains('Oradea')
        cy.contains('Arad')
        cy.contains('€79')
        cy.contains('Total (EUR)')
    })
    it('C151 check email', () => {
        cy.contains('Save and continue').click()
        cy.contains("Can't be empty")
        fillEmail()
        cy.contains('Lead passenger')
    })
    it('C152 fill passenger info', () => {
        fillEmail()
        fillPassengerInfo()
        basicPayment()
        cy.contains('Confirm and pay').click()
        cy.contains('Your booking is confirmed!',{timeout:20000})
    })
})