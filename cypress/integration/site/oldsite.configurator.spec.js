/// <reference types = "cypress"/>

import { visitSite } from "../../page-objects/site/main_page";
import { Configuration } from "../../page-objects/site/configuration";
const conf = new Configuration();
describe("old site-> main page", () => {
  beforeEach(() => {
    visitSite(
      "https://sandbox.mydaytrip.com/configurator?currency=0&departureAt=1691744400000&isOtherDirection=true&passengers=2&routeId=dc787d17-8146-438a-9be7-07fe1153b354&vehicles=0"
    );
  });
  it("check locations", () => {
    cy.contains("€225");
    cy.contains("Terezin").click();
    cy.contains("€249");
    cy.get(
      ":nth-child(1) > ._1lzkeztGnK6JZ49Pw2zHen > .zxdoEbe5EQp9-yPDOtzKn > figure > ._2ptVR0cUc4f1C8WcwHwuXT > ._2BESWBUoKhH2dnalmh4pgT > ._2I0zmdEF8nFqE8FqNffqLc > ._3G9mqb5mWemCj-khVc3ncu > ._30ni4IA7XYC49vK1zHYqjy > ._1w4GE-bWin1QF3OjdW7aSS > :nth-child(3)"
    ).click();
    cy.contains(" €252");
    cy.get(
      "._1w4GE-bWin1QF3OjdW7aSS > :nth-child(1) > .y66BHx9PkWNHOUsQVyFVD"
    ).click();
    cy.contains("€249");
  });
  it("change date&time", () => {
    cy.contains("August 11").click();
    cy.get("._3MslPIgWaPwQi58JJ8b7OF").click();
    cy.contains("September 2023");
    cy.contains("15").click();
    cy.contains("09:00 AM").click();
    cy.contains("AM").click({ force: true });
  });
  it("choose vehicle&passengers", () => {
    cy.contains("€225");
    //choose luxary sedan
    cy.get("._38TLix94Eg3g4bHzzWTm7b").click();
    cy.contains("€350");
    //add 2 passengers
    cy.get("._3bbJo1E02JnUudnyqHI1Ty").dblclick();
    //remove 1
    cy.get("._2zXS_QZ-0rkh7Ldonzva_B").click();
    //add 1
    cy.get("._3bbJo1E02JnUudnyqHI1Ty").click();
    //choose van

    cy.contains("€286");
    cy.get("._38TLix94Eg3g4bHzzWTm7b").click();
    cy.contains("€346");
  });
  it("choose vehicle&passengers", () => {
    cy.contains("book this trip").click();
    cy.contains("book with no stops").click();
    cy.contains("options & checkout", { timeout: 10000 });
  });
});
