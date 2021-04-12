/// <reference types = "cypress"/>
import { chooseOriginDestination } from "../newsite/main_page";
export function checkButtons(button:string, textOnPage:string) {
    cy.contains(button).click();
    cy.contains(textOnPage);
    cy.go("back");
}
export function StartBookingTrip() {
    cy.contains("door-to-door").should("be.visible");
    //type prag and choose Prague
    chooseOriginDestination(2, "prague", "Prague");
    //type berl and choose Berlin
    chooseOriginDestination(3, "berlin", "Berlin");
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
export function visitSite(page:string) {
    cy.visit(page, { timeout: 12000000 });
    acceptPolicy();
}