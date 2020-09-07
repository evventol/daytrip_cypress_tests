/// <reference types = "cypress"/>

export function checkPrice(CurNow, CurNext, price) {
    //change currency
    cy.contains(CurNow).click({ force: true })
    cy.contains(CurNext).click({ force: true })
    //check price in usd
    cy.contains('Book your trip').contains(price)
    cy.get('body').click()
}
export function chooseDate(numMonth, date) {//numMonth - number of month in future, date-day in month
    cy.contains('Thu, Jun 16').click({ force: true })
    cy.get('.bYdzaX').click({ force: true })
    cy.get('.eYhIvk').click({ force: true })
    if (numMonth == 0) {
        cy.contains(date).click()
    }
    else {
        for (let i = 0; i < numMonth; i++) {
            cy.get('.bYdzaX').click({ force: true })
        }
        cy.contains(date).click({ force: true })
    }
}
export function chooseTime() {
    //click on time
    cy.get('.r8mt9l-0 > .sc-1vhnu07-0 > .sc-1vhnu07-1 > .sc-1vhnu07-2 > .sc-1vhnu07-4 > .ausiav-0 > .ausiav-1 > .sc-1gvqapb-0 > .sc-1gvqapb-2').click()
    //change am to pm
    cy.get('.sc-1i55sab-7').click({ force: true })
    //+2 hour
    cy.get(':nth-child(1) > .kVYoOA').dblclick({ force: true })
    //-1 hour
    cy.get('.hTrcZv').click({ force: true })
    //+30 min
    cy.get(':nth-child(3) > .kVYoOA').dblclick({ force: true })
    //-15 min
    cy.get(':nth-child(3) > .hTrcZv').click({ force: true })
    cy.get('body').click()
}
export function addStop(beforPrice,stopPrice,afterPrice){
    cy.contains(beforPrice)
    let locationPrice="Add for "+stopPrice
    cy.contains(locationPrice).click();
    cy.contains(afterPrice)
}
export function configurateWithLocation(){
    addStop("225","€24","249")
    cy.contains('Upgrade to a Mpv').click()
    cy.contains('310')
    cy.contains("Book your trip for").click({ force: true });
    cy.contains('Complete your booking',{timeout:5000}).should('be.visible')
}
export function configurateWithoutLocation(price){
    cy.contains("Book your trip for "+price,{timeout:10000}).click({ force: true });
    cy.contains('No sights selected',{timeout:50000}).should("be.visible")
    cy.contains("Book without sights",{timeout:50000}).should("be.visible").click({ force: true })
    cy.contains('Complete your booking',{timeout:50000}).should('be.visible')
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