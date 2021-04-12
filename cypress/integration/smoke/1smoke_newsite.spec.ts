/// <reference types = "cypress"/>
import {
    startBooking,
    visitNewSite,
    loginAsTA,
    loginAsCustomer,
    landingBooking,
    goToPageAndBack,
    checkPage
} from "../../page-objects/newsite/main_page";
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
    finish3DSecureBooking,
    USDPayment,
    MasterCardPayment
} from "../../page-objects/newsite/booking";
import {
    vehicleMPVUpd,
    configurateWithoutLocation,
    nextDayConfiguration,
    addStop
} from "../../page-objects/newsite/configuration";
let locationTime = [
    ["226", "27", "253"],
    ["79", "19", "98"]
]

const configurationPage = Cypress.env('site_home_page') + "configurator?adults=3&children=0&currency=0&departureAt=1637226000000&isOtherDirection=true&luggage=2&passengers=2&routeId=dc787d17-8146-438a-9be7-07fe1153b354&vehicles=0"
const bookingPage = Cypress.env('site_home_page') + "checkout?orderId=4c3c6b8f-b6f5-4f43-b7b4-a97659cd87b4"
describe("Smoke newsite", () => {
    beforeEach(() => {
        if (Cypress.env('CI')==1){
            cy.visit(Cypress.env('site_home_page'), { timeout: 3000000 })
        }
        else{
            visitNewSite(Cypress.env('site_home_page'));
        }
    });

    it("C165 Landing cash booking", () => {
        landingBooking()
        configurateWithoutLocation("226");
        fillEmail();
        fillPassengerInfo();
        finishCashBooking();
    });
    it("C166 TA card booking", () => {
        loginAsTA("ev.test.ve+302@gmail.com","afq2t8N9");
        cy.visit(configurationPage);
        cy.contains('Your 10% travel agent discount', { timeout: 20000 })
        //cy.reload()
        cy.wait(5000)
        addStop(locationTime[0])
        vehicleMPVUpd('314','61');
        fillTAEmail();
        fillPassengerInfo();
        basicPayment();
        finishCardBooking();
    });
    it("C167 Draft booking", () => {
        cy.reload()
        startBooking('Prague','Berlin');
        configurateWithoutLocation('226');
        fillEmail();
    })
    it('C168 Urgent booking', () => {
        let newURL = nextDayConfiguration();
        cy.visit(newURL, { timeout: 100000 });
        configurateWithoutLocation('79');
        fillEmail();
        fillPassengerInfo();
        basicPayment();
        finishUrgentCardBooking();

    })
    it('C169 Customer booking', () => {
        loginAsCustomer('ev.test.ve@gmail.com','56BA9C')
        cy.url().should('include', '/customer/upcoming-trips')
        cy.visit(configurationPage)
        addStop(locationTime[0])
        vehicleMPVUpd('314','61');
        fillTAEmail();
        cy.wait(1000)
        fillPreCustomerInfo('test');
        AMEXpayment();
        finish3DSecureBooking();

    })
    it('MasterCard booking',()=>{
        cy.visit(bookingPage)
        MasterCardPayment()
        finish3DSecureBooking();
    })
    it('USD booking',()=>{
        startBooking('Boston','Bangor');
        configurateWithoutLocation('621');
        fillEmail();
        fillPassengerInfo();
        USDPayment()
        finish3DSecureBooking();
    })
    it('check all major pages of site',()=>{
        goToPageAndBack('All routes', 'Select a country')
        goToPageAndBack('Company', 'Daytrip was founded in 2015')
        goToPageAndBack('Discover', 'Discover the world with Daytrip')
        goToPageAndBack('Blog', "")
        goToPageAndBack('Terms of use', 'KEY DEFINITIONS')
        goToPageAndBack('Privacy policy', 'This is Privacy Policy of DAYTRIP EUROPE')
        goToPageAndBack('Request a custom route','Request a quote')
        checkPage(Cypress.env('site_home_page')+'discover/location/prague','Most popular routes')
        checkPage(Cypress.env('site_home_page')+'travel-agent/landing','Get 5% commission for every booking!')
        checkPage(Cypress.env('site_home_page')+'partners/xoprivate','Get 10% commission for every booking!')
        checkPage(Cypress.env('site_home_page')+'travel-voucher','travel voucher')
        checkPage(Cypress.env('site_home_page')+'landing/prague-to-vienna','Trip Information')
        checkPage(Cypress.env('site_home_page')+'discover/route/monterosso-al-mare-to-orvieto','Stop to discover these sights')
        checkPage(Cypress.env('site_home_page')+'travel-agent/login','Book private transfers for your clients easily.')
    })
    afterEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.wait(500)
    })
});