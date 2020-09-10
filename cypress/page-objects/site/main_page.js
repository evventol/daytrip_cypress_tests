/// <reference types = "cypress"/>
import { chooseOriginDestination } from "../../page-objects/newsite/main_page.js";
export function checkButtons(button, textOnPage) {
  cy.contains(button).click();
  cy.contains(textOnPage);
  cy.go("back");
}
export function StartBookingTrip() {
  cy.contains("door-to-door").should("be.visible");
  //type prag and choose Prague
  chooseOriginDestination(2, "prag", "Prague");
  //type berl and choose Berlin
  chooseOriginDestination(3, "berl", "Berlin");
  cy.contains("search").click();
  cy.contains("Plan your trip from", { timeout: 30000 });
}
export function acceptPolicy() {
  //accept terms of use

  cy.contains("accept", { timeout: 30000 }).should("be.visible");
  cy.get("button", { timeout: 30000 })
    .contains("accept", { timeout: 30000 })
    .click({ force: true });
}
export function visitSite(page) {
  cy.visit(page, { timeout: 12000000 });
  acceptPolicy();
}
