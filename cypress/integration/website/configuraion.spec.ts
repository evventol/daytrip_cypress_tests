/// <reference types = "cypress"/>

import {
    checkPrice,
    addStop,
} from "../../page-objects/newsite/configuration";
import {
    checkPassenger,
    chooseTime,
    visitNewSite,
    chooseDate,
} from "../../page-objects/newsite/main_page";
describe("new site-> config page", () => {
    const configurationPage = Cypress.env('website_home_page')
    beforeEach(() => {
        if (Cypress.env('CI')==1){
            cy.visit(Cypress.env('website_home_page'), { timeout: 3000000 })
        }
        else{
        visitNewSite(
            configurationPage+"configurator?adults=2&children=0&currency=0&departureAt=1619258000000&isOtherDirection=false&luggage=2&passengers=2&routeId=7c939590-b3ae-4523-92b6-44189180d13a&vehicles=0"
        );
        }
    });
    it("C58 Check currency", () => {
        //check price in eur
        checkPrice("EUR", "U. S. Dollar", "$");
        checkPrice("USD", "Canadian Dollar", "CA");
        checkPrice("CAD", "Euro", "€");
    });
    it("C57 Check locations", () => {
        let price=['79','20','99'];
        addStop('€',1)
        cy.contains("60 min");
        
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
        cy.contains("Upgrade to a MPV").click();
        cy.contains("Book your trip for €");
        //change vehicle to van
        cy.contains("Upgrade to a Van").click();
        cy.contains("Book your trip for €");
        //check all vehicle
        cy.contains("More options").click();
        cy.contains("sedan").click({ force: true });
    });
    it("C60 change passenger info", () => {
        cy.contains("Arad").should("be.visible")
        cy.wait(2000)
        checkPassenger(1, 1, 1);
    });
    it("C61 change time", () => {
        chooseDate(1, 15, "Sat,");
        chooseTime(":53 AM");
    });
    it("C80 book trip", () => {
        cy.wait(1000)
        cy.contains("Book your trip for", { timeout: 10000 }).click({ force: true });
        cy.contains("Book without sights").click();
    });
});