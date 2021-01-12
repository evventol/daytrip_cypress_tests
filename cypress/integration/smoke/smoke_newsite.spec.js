/// <reference types = "cypress"/>
import {
    startBooking,
    visitNewSite,
    loginAsTA,
    loginAsCustomer,
    landingBooking
} from "../../page-objects/newsite/main_page.js";
import {
    fillEmail,
    fillPassengerInfo,
    basicPayment,
    finishCardBooking,
    finishCashBooking,
    fillTAEmail,
    finishUrgentCardBooking,
    fillPreCustomerInfo,
    AMEXpayment,
    finish3DSecureBooking
} from "../../page-objects/newsite/booking.js";
import {
    configurateWithLocation,
    configurateWithoutLocation,
    nextDayConfiguration
} from "../../page-objects/newsite/configuration.js";
let locationTime = [
    ["226", "€24", "250"],
    ["79", "€19", "98"]
]
const configurationPage = Cypress.env('website_home_page') + "configurator?adults=2&children=0&currency=0&departureAt=1655359200000&isOtherDirection=true&luggage=2&passengers=2&routeId=7c939590-b3ae-4523-92b6-44189180d13a&vehicles=0"
describe("Smoke newsite", () => {
    beforeEach(() => {
        //visitNewSite(Cypress.env('website_home_page'));
        cy.visit(Cypress.env('website_home_page'), { timeout: 3000000 })
    });
    it("Landing cash booking", () => {
        landingBooking()
        configurateWithoutLocation("226");
        fillEmail();
        fillPassengerInfo();
        finishCashBooking();
    });
    it("TA card booking", () => {
        loginAsTA();
        startBooking();
        cy.contains('Your 10% travel agent discount', { timeout: 5000 })
        cy.reload()
        configurateWithLocation(locationTime[0], '311','61');
        fillTAEmail();
        fillPassengerInfo();
        basicPayment();
        finishCardBooking();
    });
    it("Draft booking", () => {
        cy.visit(configurationPage);
        configurateWithoutLocation("79");
        fillEmail();
    })
    it('Urgent booking', () => {
        let newURL = nextDayConfiguration();
        cy.visit(newURL, { timeout: 100000 });
        configurateWithoutLocation("79");
        fillEmail();
        fillPassengerInfo();
        basicPayment();
        finishUrgentCardBooking();

    })
    it('Customer booking', () => {
        loginAsCustomer()
        cy.url().should('include', '/customer/upcoming-trips')
        cy.visit(configurationPage)
        configurateWithLocation(locationTime[1], "118",'20');
        fillTAEmail();
        cy.wait(1000)
        fillPreCustomerInfo('test');
        AMEXpayment();
        //finish3DSecureBooking();

    })
    afterEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.reload()
    })
});