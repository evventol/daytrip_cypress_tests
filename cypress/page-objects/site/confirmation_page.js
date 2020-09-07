/// <reference types = "cypress"/>

export function cancelTrip() {
  cy.get("button").contains("show").click();
  cy.get("button").contains("cancel the trip").click();
}
