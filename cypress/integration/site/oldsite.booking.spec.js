/// <reference types = "cypress"/>

import { PassInfo } from '../../page-objects/site/booking_page'
import { visitSite } from "../../page-objects/site/main_page";
const passInfo = new PassInfo()
describe('old site-> booking page', () => {
    beforeEach(()=>{
        visitSite("https://sandbox.mydaytrip.com/booking?currency=0&departureAt=1663405200000&isOtherDirection=false&passengers=2&routeId=26fd8bce-9d6a-4c04-8fd2-3c49fa975fa6&vehicles=0");
    })
it('email check',()=>{
    //check text
    cy.contains('Your pick-up address in Prague (optional)')
    //fill 
    cy.get('input[placeholder="address or name of your hotel"]').type('prague, lala 2')
    cy.get('button').contains('Add drop-off address').click()
    cy.get('input[placeholder="address or name of your hotel"]').last().type(' lalaba 3')
    passInfo.emailInfo()
    cy.contains('First name')
})
it('passenger info check',()=>{
    cy.wait(500)
    //fill email
    passInfo.emailInfo()
    //Add extra luggage
    cy.contains('Add extra luggage').click()
    //check adding
    cy.contains('3x check-in suitcase and 3x carry-on luggage for your trip')
    //remove luggage

    //Add details of another passenger
    cy.get('button').contains('Add details of another passenger').click()
    //check window open
    cy.contains('2nd passenger')
    //hide 2nd
    cy.contains(' hide details').click()
    //fill passenger info
    passInfo.passengerInfo()
})
it.only('payment check',()=>{
    passInfo.emailInfo()
    passInfo.passengerInfo()
    passInfo.paymentTextCheck()
    passInfo.cardPayment()
    cy.contains('Confirm & ').last().click({force: true})
    cy.contains("Your trip is confirmed!", { timeout: 50000 });
})
})
