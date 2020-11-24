/// <reference types = "cypress"/>

export function checkPrice(CurNow, CurNext, price) {
    //change currency
    cy.contains(CurNow).click({ force: true })
    cy.contains(CurNext).click({ force: true })
        //check price in usd
    cy.contains('Book your trip').contains(price)
    cy.get('body').click()
}

export function addStop(beforPrice, stopPrice, afterPrice) {
    cy.contains(beforPrice)
    let locationPrice = "Add for " + stopPrice
    cy.contains(locationPrice).should('be.visible')
    cy.contains(locationPrice).dblclick();
    cy.contains(afterPrice)
}
export function configurateWithLocation(time, mpvPrice) {
    addStop(time[0], time[1], time[2])
    cy.wait(1000)
    cy.contains('Upgrade to a Mpv', { timeout: 15000 }).click({ force: true })
    cy.contains(mpvPrice)
    cy.contains("Book your trip for").click({ force: true });
    cy.contains('Complete your booking', { timeout: 5000 }).should('be.visible')
}
export function configurateWithoutLocation(price) {
    cy.contains("Book your trip for " + price, { timeout: 10000 }).click({ force: true });
    cy.contains('No sights selected', { timeout: 50000 }).should("be.visible")
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