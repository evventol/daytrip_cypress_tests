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
export function loginAsTA(email:string,password:string) {
    cy.get('button').contains('My Booking').click()
    cy.contains("I am a travel agent").click()
    cy.contains('Book private transfers for your clients easily.',{timeout:10000}).should('be.visible')
    cy.get('input[id="login-email"]').type(email)
    cy.get('input[id="login-password"]').type(password)
    cy.get('button').contains('Sign in').click()
    cy.contains('Account',{timeout:20000}).should('be.visible')

}
export function loginAsCustomer(email:string,reference:string) {
    cy.get('button').contains('My Booking').click()
    cy.get('input[id="email"]').type(email)
    cy.get('input[id="reference"]').type(reference)
    cy.get('button').contains('Go to your trips').click()
    cy.contains('Past trips',{timeout:100000})
}
export function goToPageAndBack(link:string, checkString:string) {

    cy.contains(link).click({ force: true })
    if (link != 'Blog') {
        cy.contains(checkString,{timeout:15000}).should('be.visible')
        cy.wait(50)
        cy.go('back')
        cy.contains('One-way',{timeout:20000}).should('be.visible')
    }
}
export function checkPage(link:string,content:string){
    cy.visit(link)
    cy.contains(content,{timeout:10000}).should('be.visible')
}

export function chooseOriginDestination(flag:number, shortname:string, fullName:string) {
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
    }
    cy.wait(100)
        //choose sity
    cy.contains(fullName, { timeout: 10000 }).should('be.visible').click({ force: true })
}
export function checkPassenger(adultsNum:number, childrenNum:number, luggageNum:number) {

    let plus= ".iEsFce";
    let minus= ".jHUKca";
    cy.contains('passengers')
    cy.get('button').contains(' passengers').click({ force: true })
    cy.contains('Adults:', { timeout: 5000 })
    for (let i = 0; i < adultsNum; i++) {
        cy.get(plus).eq(0).dblclick({ force: true })
        cy.get(minus).eq(0).click({ force: true })
    }
    for (let i = 0; i < childrenNum; i++) {
        cy.get(plus).eq(1).dblclick({ force: true })
        cy.get(minus).eq(1).click({ force: true })
    }
    for (let i = 0; i < luggageNum; i++) {
        cy.get(plus).eq(2).dblclick({ force: true })
        cy.get(minus).eq(2).click({ force: true })
    }

}
export function chooseDate(numMonth:number, date:number, currentDate:string) { //numMonth - number of month in future, date-day in month, currentDate - current date
    let plus= '.fffOKh';
    let minus= '.dIbboq';
    cy.get('button').contains(currentDate).click({ force: true })
    cy.get(plus).click({ force: true })
    cy.get(minus).click({ force: true })
    if (numMonth == 0) {
        cy.contains(date).click({ force: true })
    } else {
        for (let i = 0; i < numMonth; i++) {
            cy.get(plus).click({ force: true })
        }
        cy.contains(date).click({ force: true })
    }
}
export function chooseTime(time:string) {
    let plus='.dVxJJi';
    let minus='.bdfgRd'
    //click on time
    cy.get('button').contains(time).click({ force: true })
        //change am to pm
    cy.get('.TimePickerTimeViewstyles__TimePickerTimeViewPhaseSwitchButton-pbft0o-7').click({ force: true })
        //+2 hour
    cy.get(':nth-child(1) > '+plus).dblclick({ force: true })
        //-1 hour
    cy.get(':nth-child(1) > '+minus).click({ force: true })
        //+30 min
    cy.get(':nth-child(3) > '+plus).dblclick({ force: true })
        //-15 min
    cy.get(':nth-child(3) > '+minus).click({ force: true })
    cy.get('body').click({ force: true })
}
export function acceptPolicy() {
    cy.contains('Accept', { timeout: 30000 }).should('be.visible')
        //accept terms of use
    cy.get('button').contains('Accept').click({ force: true })
}
export function visitNewSite(site:string) {
    cy.visit(site, { timeout: 3000000 })
    acceptPolicy()
}
export function startBooking(origin:string,destination:string) {
    //choose origin and destination
    chooseOriginDestination(0, origin, origin)
    chooseOriginDestination(1, destination, destination)
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