/// <reference types = "cypress"/>

import {
  checkPrice,
  chooseDate,
} from "../../page-objects/newsite/configuration.js";
import {
  checkPassenger,
  chooseTime,
  visitNewSite,
} from "../../page-objects/newsite/main_page.js";
describe("new site-> config page", () => {
  beforeEach(() => {
    visitNewSite(
      "https://website.staging.mydaytrip.net/configurator?adults=2&children=0&currency=0&departureAt=1655359200000&isOtherDirection=true&luggage=2&passengers=2&routeId=7c939590-b3ae-4523-92b6-44189180d13a&vehicles=0"
    );

  });
  it("C58 Check currency", () => {
    //check price in eur
    checkPrice("EUR", "U. S. Dollar", "$");
    checkPrice("USD", "Canadian Dollar", "CA");
    checkPrice("CAD", "Euro", "€");
  });
  it("C57 Check locations", () => {
    cy.contains("60 min");
    //add 30 min to location stop
    cy.get(
      ".eQUxdF > .ConfiguratorLocationstyles__ConfiguratorLocationContent-sc-107bezc-1 > .ConfiguratorLocationstyles__ConfiguratorLocationActions-sc-107bezc-2 > .LocationDurationSelectorstyles__StyledLocationDurationSelector-eu0tdg-0 > :nth-child(4)"
    ).dblclick();
    //remove 15 min
    cy.get(
      ".eQUxdF > .ConfiguratorLocationstyles__ConfiguratorLocationContent-sc-107bezc-1 > .ConfiguratorLocationstyles__ConfiguratorLocationActions-sc-107bezc-2 > .LocationDurationSelectorstyles__StyledLocationDurationSelector-eu0tdg-0 > :nth-child(1)"
    ).click();
    //add location
    cy.contains("Add for €21").click();
    //check all price
    cy.contains("Book your trip for €100");
    //remove location
    cy.get("button").contains("Cancel").click();
    cy.contains("Select recommended").click();
    cy.get(
      ".ConfiguratorRouteSelector__StyledConfiguratorRouteSelector-sai2wv-0 > .RouteSelectorstyles__StyledRouteSelector-wexaut-0"
    ).contains("Waterlily Lake In Baile Felix");
    cy.get(
      ".ConfiguratorRouteSelector__StyledConfiguratorRouteSelector-sai2wv-0 > .RouteSelectorstyles__StyledRouteSelector-wexaut-0"
    ).contains("Bodrog Monastery");
  });
  it("C59 vehicle info", () => {
    //check origin/destination
    cy.contains("Oradea");
    cy.contains("Arad");
    //change vehicle to mpv
    cy.contains("Upgrade to a Mpv").click();
    cy.contains("Book your trip for €");
    //change vehicle to van
    cy.contains("Upgrade to a Van").click();
    cy.contains("Book your trip for €");
    //check all vehicle
    cy.contains("More options").click();
    cy.contains("sedan").click({ force: true });
  });
  it("C60 change passenger info", () => {
    checkPassenger(1,1,1);
  });
  it("C61 change time", () => {
    chooseDate(1, 15);
    chooseTime();
  });
  it("C80 book trip", () => {
    cy.contains("Book your trip for").click({ force: true });
    cy.contains("Book without sights").click();
  });
});

