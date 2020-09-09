/// <reference types = "cypress"/>

import { PassInfo } from "../../page-objects/site/booking_page";
import { Configuration } from "../../page-objects/site/configuration";
import { StartBookingTrip, visitSite } from "../../page-objects/site/main_page";
import { loginAsTA, loginToCI } from "../../page-objects/site/CI_page";
import { cancelTrip } from "../../page-objects/site/confirmation_page";
const passInfo = new PassInfo();
const conf = new Configuration();
describe("Smoke site", () => {
  beforeEach(() => {
    cy.visit("https://sandbox.mydaytrip.com", { timeout: 12000000 });
    
    //visitSite("https://sandbox.mydaytrip.com");
  });
  it('Draft booking',()=>{
    cy.contains("accept", { timeout: 300000 }).should("be.visible");
  cy.get("button", { timeout: 30000 })
    .contains("accept", { timeout: 30000 })
    .click({ force: true });
    conf.navigateToConfiguratorPage();
    conf.bookWithoutLocation();
    passInfo.emailInfo();
    passInfo.passengerInfo();
})
  it("Urgent booking ", () => { 
    StartBookingTrip();
    let newURL=conf.nextDayConfiguration();
    cy.visit("https://sandbox.mydaytrip.com")
    cy.visit(newURL,{timeout:100000});
    conf.bookWithoutLocation();
    passInfo.emailInfo();
    passInfo.passengerInfo();
    passInfo.cashPayment();
    cy.contains("Confirm & Pay").click();
    cy.contains("We’re looking for your driver", { timeout: 50000 });
    cy.contains('cancel the booking request now').click()
  });
  it("TA booking", () => {
    loginAsTA();
    conf.navigateToConfiguratorPage();
    conf.bookLocation();
    passInfo.TAemailInfo();
    cy.contains("€333");
    passInfo.TApassengerInfo();
    cy.wait(1000);
    passInfo.cashPayment();
    cy.contains("Confirm & Pay").click();
    cy.contains("Your trip is confirmed!", { timeout: 50000 });
    cancelTrip();
  });
  it("C81	Cash booking", () => {
    conf.navigateToConfiguratorPage();
    conf.bookWithoutLocation();
    passInfo.emailInfo();
    passInfo.passengerInfo();
    passInfo.cashPayment();
    cy.contains("Confirm & Pay").click();
    cy.contains("Your trip is confirmed!", { timeout: 50000 });
  });
  it("C82	Preloging card booking", () => {
    loginToCI();
    conf.navigateToConfiguratorPage();
    conf.bookLocation();
    passInfo.TAemailInfo();
    passInfo.customerPassengerInfo();
    passInfo.customerCardPayment();
    cy.contains("Confirm & Pay").click();
    cy.contains("Your trip is confirmed!", { timeout: 50000 });
  });
});
