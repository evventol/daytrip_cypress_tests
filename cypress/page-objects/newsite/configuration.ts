/// <reference types = "cypress"/>

export function checkPrice(CurNow:string, CurNext:string, price:string) {
    //change currency
    cy.contains(CurNow).click({ force: true })
    cy.contains(CurNext).click({ force: true })
        //check price in usd
    cy.contains('Book your trip').contains(price)
}

export function addStop(price:any) {
    cy.get('button').contains(price[0],{timeout:20000})
    cy.contains(price[1]).should('be.visible')
    cy.wait(1000)
    cy.contains(price[1]).dblclick();
    cy.contains(price[2],{timeout:20000})
}
export function vehicleMPVUpd(mpvPrice:string,mpvUpdatePrice:string) {
    cy.contains('Upgrade to a MPV for €'+mpvUpdatePrice, { timeout: 15000 }).click({ force: true })
    cy.contains(mpvPrice)
    cy.contains("Book your trip for").click({ force: true });
    cy.contains('Complete your booking', { timeout: 5000 }).should('be.visible')
}
export function configurateWithoutLocation(price:string) {
    cy.wait(1000)
    cy.get('button').contains(price, { timeout: 10000 }).click({ force: true });
    cy.contains('No sights selected', { timeout: 50000 }).should("be.visible")
    cy.wait(1000)
    cy.contains("Book without sights", { timeout: 50000 }).should("be.visible").click({ force: true })
    cy.contains('Complete your booking', { timeout: 50000 }).should('be.visible')
}
export function nextDayConfiguration() {
    let time = Date.now();
    let timeDay = 86357407;
    time = time + timeDay;
    console.log(time);
    let configurationURL =
        "https://website.staging.mydaytrip.net/configurator?adults=2&children=0&currency=0&departureAt=" +
        time +
        "&isOtherDirection=true&luggage=2&passengers=2&routeId=7c939590-b3ae-4523-92b6-44189180d13a&vehicles=0";
    return configurationURL;
}
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })