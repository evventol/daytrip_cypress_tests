/// <reference types = "cypress"/>
export function fillEmail() {
    let rand=Math.floor(Math.random()*10000)
    cy.get("#lead-passenger-email").type("ev.test.ve+"+rand+"@gmail.com");
    cy.contains("Save and continue").click();
    cy.contains("Lead passenger", { timeout: 10000 }).should("be.visible");
}
export function fillPassengerInfo() {
    cy.get("#adult_0_firstName").type("test");
    cy.get("#adult_0_lastName").type("test2");
    cy.get('input[placeholder="DD"]').type("01");
    cy.get('.MonthSelectorstyles__ToggleButton-tv2yru-1')
    cy.get('#month-option-0').click()
    cy.get('input[placeholder="YYYY"]').type("2000");
    cy.get("#phone").type("4155552671");
}
export function fillPreCustomerInfo(firstName:string) {
    cy.contains(firstName, { timeout: 5000 })

}
export function fillTAEmail() {
    cy.get('input[placeholder="e.g. john@brown.com"]')
    cy.wait(2500)
    cy.contains("Save and continue").click({ force: true });
    cy.contains("Lead passenger", { timeout: 10000 }).should("be.visible");
}
export function AMEXpayment() {
    fillCard('375987888352361', '1234')
}
export function MasterCardPayment() {
    fillCard('5549650000001239', '111')
}
export function basicPayment() {
    //fillCard('4970104100876588', '111')
    fillCard('5555555555554444', '111')
}
export function USDPayment(){
    fillCard('4970104100876596', '111')
}
export function fillCard(cardNumber:string, cvv:string) {
    cy.get("#cc-number").type(cardNumber);
    cy.get("#cc-exp").type("1223");
    cy.get("#cc-csc").type(cvv);
    cy.get("#cc-given-name").type("test");
    cy.get("#cc-family-name").type("test");
    cy.get(
        ".Paymentstyles__PaymentContentHolder-sc-1jpgkf9-3 > .CountrySelectstyles__StyledCountrySelect-sc-1si02dn-0 > .CountrySelectstyles__CountrySelectInput-sc-1si02dn-3"
    ).click();
    cy.contains("United States").click();
}
export function finishCardBooking() {
    cy.contains("Confirm and pay").click();
    cy.contains("Your booking is confirmed!", { timeout: 150000 }).should('be.visible');
}
export function finish3DSecureBooking() {
    cy.contains("Confirm and pay").click();
    _3dSecure()
    cy.contains("Your booking is confirmed!", { timeout: 150000 }).should('be.visible');
}
export function finishCashBooking() {
    cy.contains("Cash").click({ force: true });
    cy.contains("Confirm your booking").click({ force: true });
    cy.contains("Your booking is confirmed!", { timeout: 150000 }).should('be.visible');
}
export function finishUrgentCardBooking() {
    cy.contains("Confirm and pay").should('be.visible').click({ force: true });
    cy.contains("We’re looking for a driver", { timeout: 150000 }).should('be.visible');
}
export function finishBooking(cardCash:boolean){
    if (cardCash){
    cy.contains("Cash").click({ force: true });
    cy.contains("Confirm your booking").click({ force: true });
    }
    else{
        cy.contains("Confirm and pay").should('be.visible').click({ force: true });
    }

}
export function lastWords(typeOfBooking:boolean){
    if (typeOfBooking){
        cy.contains("Your booking is confirmed!", { timeout: 150000 }).should('be.visible');
    }
    else
    {
        cy.contains("We’re looking for a driver", { timeout: 150000 }).should('be.visible');
    }
}
export function _3dSecure(){
    cy.get('input[id="code"]', { timeout: 20000 }).type('MANGOPAY123')
    cy.contains('Submit').click()
}

