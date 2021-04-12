/// <reference types = "cypress"/>

import { goToPageAndBack} from '../../page-objects/newsite/main_page'
import { StartBookingTrip,visitSite } from '../../page-objects/old_site/main_page'
describe('old site-> main page', () => {
    beforeEach(() => {
        visitSite('https://sandbox.mydaytrip.com')
    })
    it('C63 Check buttons of navigation',()=>{
        goToPageAndBack('all routes','All routes we offer')
        cy.wait(1500)
        goToPageAndBack('about us', 'Every traveler deserves real insight')
        cy.wait(1500)
        goToPageAndBack('discover','Experience beautiful places you might have missed')
        cy.wait(1500)
        goToPageAndBack('request a custom route','Request a quote')
        cy.wait(1500)
        goToPageAndBack('my trips',"If you're a travel agent, click here")
    })
    it('C62 Route selection',()=>{
        StartBookingTrip()
    })

})