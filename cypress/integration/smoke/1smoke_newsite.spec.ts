/// <reference types = "cypress"/>
/// <reference types = "cypress-xpath"/>

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
    MasterCardPayment,
    VISAPayment
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
describe("Smoke newsite", () => {
    beforeEach(() => {
        if (Cypress.env('CI')==1){
            cy.visit(Cypress.env('site_home_page'), { timeout: 3000000 })
        }
        else{
            visitNewSite(Cypress.env('site_home_page'));
        }
        cy.reload()
    });

    it("C165 Landing cash booking", () => {
        landingBooking()
        cy.contains('10:15')
        configurateWithoutLocation("226");
        fillEmail();
        cy.contains('10:15')
        fillPassengerInfo();
        finishCashBooking();
    });
    it("C166 TA card booking", () => {
        loginAsTA("ev.test.ve+302@gmail.com","afq2t8N9");
        startBooking('Prague','Berlin');
        cy.contains('Your 10% travel agent discount', { timeout: 20000 })
        addStop(locationTime[0])
        cy.contains('10:15')
        vehicleMPVUpd('314','61');
        fillTAEmail();
        cy.contains('10:15')
        fillPassengerInfo();
        VISAPayment();
        finish3DSecureBooking();
    });
    it("C167 Draft booking", () => {
        cy.reload()
        startBooking('Prague','Berlin');
        cy.contains('10:15')
        configurateWithoutLocation('226');
        cy.contains('10:15')
        fillEmail();
    })
    it('C168 Urgent booking', () => {
        cy.reload()
        let newURL = nextDayConfiguration();
        cy.visit(newURL, { timeout: 100000 });
        cy.xpath('//*[@id="__next"]/div[2]/div[2]/div/div/div/div[1]/div[2]/div[2]/div[1]/div[2]/button').invoke('text').then(($time)=>{
            configurateWithoutLocation('79');
            cy.xpath('//*[@id="__next"]/div/div[1]/div/div[2]/div[1]/div/div[1]/div[2]/span').contains($time)
        })
        fillEmail();
        fillPassengerInfo();
        VISAPayment();
        finish3DSecureBooking();

    })
    it('C169 Customer booking', () => {
        cy.reload()
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

        startBooking('Prague','Berlin');
        configurateWithoutLocation('226');
        fillEmail();
        fillPassengerInfo();
        MasterCardPayment()
        finish3DSecureBooking();
    })
    it('AMEX booking',()=>{
        cy.visit(configurationPage)
        addStop(locationTime[0])
        vehicleMPVUpd('314','61');
        fillEmail();
        fillPassengerInfo();
        AMEXpayment()
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
    it('create custom booking',()=>{
        cy.xpath('//*[@id="__next"]/section[1]/div/div[1]/p/a').click()
        cy.contains('Request a quote',{timeout:10000}).should('be.visible')
        //add origin
        cy.xpath('//*[@id="origin-address"]').type('Iseo, Province of Brescia, Italy')
        cy.xpath('//*[@id="origin-address"]').click()
        cy.contains('Iseo, Province of Brescia, Italy').click({force:true})
        //add destination
        cy.xpath('//*[@id="destination-address"]').type('Rimini, Province of Rimini, Italy')
        cy.xpath('//*[@id="destination-address"]').click()
        cy.contains('Rimini, Province of Rimini, Italy').click({force:true})
        //add time
        cy.wait(200)
        cy.contains('add departure date/time *').click()
        //change date
        cy.xpath('//*[@id="form"]/div[2]/div[2]/div/div[1]/button').click()
        cy.xpath('//*[@id="form"]/div[2]/div[2]/div/div[1]/div/div/button[2]').click()
        cy.contains('15').click()
        //change time
        cy.xpath('//*[@id="form"]/div[2]/div[2]/div/div[2]/button').click()
        cy.xpath('//*[@id="form"]/div[2]/div[2]/div/div[2]/div/div[1]/button[2]').click()
        cy.xpath('//*[@id="form"]/div[2]/div[2]/div/div[2]/div/div[2]/button[2]').click()
        cy.contains('10:15')
        //add passengers
        cy.contains('add number of passengers *').click()
        // +1 adult
        cy.xpath('//*[@id="form"]/div[2]/div[4]/div[1]/div/div/button[1]').click()
        //-1 adult
        cy.xpath('//*[@id="form"]/div[2]/div[4]/div[1]/div/div/button[2]').click()
        // +1 child
        cy.xpath('//*[@id="form"]/div[2]/div[4]/div[2]/div/div/button[1]').click()
        //-1 child
        cy.xpath('//*[@id="form"]/div[2]/div[4]/div[2]/div/div/button[2]').click()
        // //choose luxury sedan 
        // cy.xpath('//*[@id="form"]/div[2]/div[5]/label').click()
        //fill name
        cy.xpath('//*[@id="full-name"]').type(' Test custom')
        //fill email
        cy.xpath('//*[@id="email"]').type('qwerty@qwerty.com')
        //request custom form
        cy.xpath('//*[@id="form"]/div[3]/button').click()
        //check price
        cy.contains('The price for your requested trip is €530',{timeout:20000}).should('be.visible')
        cy.xpath('//*[@id="__next"]/div/div/div/div[1]/div/div/div/button[2]').click()
        cy.contains('Complete your booking',{timeout:20000}).should('be.visible')
        cy.contains('10:15')
        fillPassengerInfo();
        VISAPayment();
        finish3DSecureBooking();
    })
    afterEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.wait(500)
    })
});