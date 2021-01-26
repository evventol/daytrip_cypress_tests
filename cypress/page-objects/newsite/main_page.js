/// <reference types = "cypress"/>
export function landingBooking() {
    cy.visit('https://website.staging.mydaytrip.net/landing/prague-to-berlin')
        //add passenger info
    checkPassenger(1, 0, 0)
        //add date
    chooseDate(1, 25, "select")
        //add time
    chooseTime(":00")
        //book trip
    cy.contains('Search').first().click()
    cy.contains('Route', { timeout: 5000 }).should('be.visible')
}
export function loginAsTA() {
    cy.get('button').contains('My Booking').click()
    cy.contains("I am a travel agent").click()
    cy.get('input[id="login-email"]').type("ev.test.ve+302@gmail.com")
    cy.get('input[id="login-password"]').type("afq2t8N9")
    cy.get('button').contains('Sign in').click()

}
export function loginAsCustomer() {
    cy.get('button').contains('My Booking').click()
    cy.get('input[id="email"]').type('ev.test.ve@gmail.com')
    cy.get('input[id="reference"]').type('56BA9C')
    cy.get('button').contains('Go to your trips').click()
}
export function goToPageAndBack(link, checkString) {

    cy.contains(link).click({ force: true })
    if (link != 'Blog') {
        cy.contains(checkString)
        cy.go('back')
    } else {}
}

export function chooseOriginDestination(flag, shortname, fullName) {
    switch (flag) {
        case 0:
            { //ns origin
                cy.get('input[placeholder="From…"]', { timeout: 10000 }).first().type(shortname)
                break;
            }
        case 1:
            { //ns destination
                cy.get('input[placeholder="…to"]', { timeout: 10000 }).first().type(shortname)
                break;
            }
        case 2:
            { //site origin
                cy.contains('I want', { timeout: 10000 }).first().type(shortname)
                break;
            }
        case 3:
            { //site destination
                cy.contains('... and go to', { timeout: 10000 }).type(shortname)
            }
    }
    cy.wait(500)
        //choose sity
    cy.contains(fullName, { timeout: 10000 }).should('be.visible').click({ force: true })
}
export function checkPassenger(adultsNum, childrenNum, luggageNum) {

    let plus= ".jpwWER";
    let minus= ".gLwgGx";
    cy.contains('passengers')
    cy.get('button').contains(' passengers').click({ force: true })
    cy.contains('Adults:', { timeout: 5000 })
    for (let i = 0; i < adultsNum; i++) {
        cy.get(':nth-child(1) > .PassengersSelectorstyles__Actions-grmkku-11 > '+plus).dblclick({ force: true })
        cy.get(':nth-child(1) > .PassengersSelectorstyles__Actions-grmkku-11 > '+minus).click({ force: true })
    }
    for (let i = 0; i < childrenNum; i++) {
        cy.get(':nth-child(2) > .PassengersSelectorstyles__Actions-grmkku-11 > '+plus).dblclick({ force: true })
        cy.get(':nth-child(2) > .PassengersSelectorstyles__Actions-grmkku-11 > '+minus).click({ force: true })
    }
    for (let i = 0; i < luggageNum; i++) {
        cy.get(':nth-child(3) >  .PassengersSelectorstyles__Actions-grmkku-11 > '+plus).dblclick({ force: true })
        cy.get(':nth-child(3) > .PassengersSelectorstyles__Actions-grmkku-11 > '+minus).click({ force: true })
    }
    cy.get(':nth-child(3) > .PassengersSelectorstyles__Actions-grmkku-11').click({force:true})
}
export function chooseDate(numMonth, date, currentDate) { //numMonth - number of month in future, date-day in month, currentDate - current date
    cy.get('button').contains(currentDate).click({ force: true })
    cy.get('.fffOKh').click({ force: true })
    cy.get('.dIbboq').click({ force: true })
    if (numMonth == 0) {
        cy.contains(date).click({ force: true })
    } else {
        for (let i = 0; i < numMonth; i++) {
            cy.get('.fffOKh').click({ force: true })
        }
        cy.contains(date).click({ force: true })
    }
}
export function chooseTime(time) {
    //click on time
    cy.get('button').contains(time).click({ force: true })
        //change am to pm
    cy.get('.TimePickerTimeViewstyles__TimePickerTimeViewPhaseSwitchButton-pbft0o-7').click({ force: true })
        //+2 hour
    cy.get(':nth-child(1) > .dVxJJi').dblclick({ force: true })
        //-1 hour
    cy.get(':nth-child(1) > .bdfgRd').click({ force: true })
        //+30 min
    cy.get(':nth-child(3) > .dVxJJi').dblclick({ force: true })
        //-15 min
    cy.get(':nth-child(3) > .bdfgRd').click({ force: true })
    cy.get('body').click({ force: true })
}
export function acceptPolicy() {
    cy.contains('Accept', { timeout: 30000 }).should('be.visible')
        //accept terms of use
    cy.get('button').contains('Accept').click({ force: true })
}
export function visitNewSite(site) {
    cy.visit(site, { timeout: 3000000 })
    acceptPolicy()
}
export function startBooking() {
    //choose origin and destination
    chooseOriginDestination(0, 'prague', 'Prague')
    chooseOriginDestination(1, 'berlin', 'Berlin')
        //add passenger info
    checkPassenger(1, 0, 0)
        //add date
    chooseDate(1, 25, "select")
        //add time
    chooseTime(":00")
        //book trip
    cy.contains('Search').first().click()
    cy.contains('Route', { timeout: 5000 }).should('be.visible')
}