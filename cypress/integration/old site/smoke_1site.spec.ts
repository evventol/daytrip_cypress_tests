/// <reference types = "cypress"/>

import { PassInfo } from "../../page-objects/old_site/booking_page";
import { Configuration } from "../../page-objects/old_site/configuration";
import { StartBookingTrip, visitSite } from "../../page-objects/old_site/main_page";
import {loginToCI } from "../../page-objects/old_site/CI_page";
import { cancelTrip } from "../../page-objects/old_site/confirmation_page";
const passInfo = new PassInfo();
const conf = new Configuration();
describe.skip("Smoke site", () => {
    beforeEach(() => {
        cy.visit("https://sandbox.mydaytrip.com", { timeout: 12000000 });
        //visitSite("https://sandbox.mydaytrip.com")
    });
    it('Draft booking', () => {
        conf.navigateToConfiguratorPage();
        conf.bookWithoutLocation();
        passInfo.emailInfo();
    })
    it("Urgent booking ", () => {
        StartBookingTrip();
        let newURL = conf.nextDayConfiguration();
        cy.visit("https://sandbox.mydaytrip.com")
        cy.visit(newURL, { timeout: 100000 });
        conf.bookWithoutLocation();
        passInfo.emailInfo();
        passInfo.passengerInfo();
        passInfo.cashPayment();
        cy.contains("Confirm & Pay").click();
        cy.contains("We’re looking for your driver", { timeout: 50000 });
        cy.contains('cancel the booking request now').click()
    });
    it("TA booking", () => {
        conf.navigateToConfiguratorPage();
        cy.reload()
        conf.bookLocation();
        passInfo.TAemailInfo();
        cy.contains('You are logged in as a travel agent. You will receive your 10% discount at checkout.', { timeout: 10000 })
        passInfo.TApassengerInfo();
        cy.wait(1000);
        passInfo.cashPayment();
        cy.contains("Confirm & Pay").dblclick({ force: true });
        cy.contains("Your trip is confirmed!", { timeout: 50000 });
        cancelTrip();
    });
    it("C81	Cash booking", () => {
        conf.navigateToConfiguratorPage();
        conf.bookWithoutLocation();
        passInfo.emailInfo();
        passInfo.passengerInfo();
        passInfo.cashPayment();
        cy.contains("Confirm & Pay").dblclick({ force: true });
        cy.contains("Your trip is confirmed!", { timeout: 50000 });
    });
    it("C82	Preloging customer card booking", () => {
        loginToCI();
        conf.navigateToConfiguratorPage();
        conf.bookLocation();
        passInfo.TAemailInfo();
        passInfo.customerPassengerInfo();
        passInfo.customerCardPayment();
        cy.contains("Confirm & Pay").dblclick({ force: true });
        cy.contains("Your trip is confirmed!", { timeout: 50000 });
    });
    afterEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.reload()
    })
});