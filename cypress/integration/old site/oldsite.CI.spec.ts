/// <reference types = "cypress"/>

import { loginToCI, goToCI } from "../../page-objects/old_site/CI_page";
import { visitSite } from "../../page-objects/old_site/main_page";
import { PassInfo } from "../../page-objects/old_site/booking_page";
import { Configuration } from "../../page-objects/old_site/configuration";
const conf = new Configuration();
const passInfo = new PassInfo();
describe("old site-> CI", () => {
  beforeEach(() => {
    visitSite("https://sandbox.mydaytrip.com");
  });
  it("check text", () => {
    loginToCI();
    goToCI();
    cy.contains("Upcoming trip");
    cy.contains("Prague to Berlin");
    cy.contains("view details").first().click();
    cy.contains("Itinerary");
    cy.contains("Passengers");
    cy.contains("Your driver");
    cy.contains("Vehicle");
    cy.contains("Payment information");
    cy.contains(
      "If you want to make changes to your trip and aren't able to here, please contact us at sandbox@mydaytrip.com."
    );
    cy.contains("Booking reference:");
    cy.contains("Email address");
    cy.contains("Date of birth");
    cy.contains("Phone number");
  });
});
