/// <reference types = "cypress"/>
export class PassInfo {
  emailInfo() {
    this.emailCheck();
    //enter email
    cy.get(":nth-child(2) > :nth-child(1) > input", { timeout: 6000 }).type(
      "ev.test.ve+1888@gmail.com"
    );
    //go next
    cy.contains("Save & Continue").click();
  }
  TAemailInfo() {
    cy.contains("Save & Continue").click();
  }
  TApassengerInfo() {
    //fill birth day
    cy.get('[placeholder="MM"]').type("01");
    cy.get('[placeholder="DD"]').type("01");
    cy.get('[placeholder="YYYY"]').type("1999");
    //fill phone number
    //cy.get("._31PASOPl6kPy9Vrb5BjvUh").type("4155552672");
    cy.contains("save & continue").last().click({ force: true });
  }
  customerPassengerInfo(){
        //fill birth day
        cy.get('[placeholder="MM"]').type("01");
        cy.get('[placeholder="DD"]').type("01");
        cy.get('[placeholder="YYYY"]').type("1999");
        //fill phone number
        cy.contains("save & continue").last().click({ force: true });
  }
  passengerInfo() {
    this.passengerCheck();
    //fill name
    cy.get('[placeholder="Cynthia Jane"]').type("TEST");
    this.passengerCheck();
    //fill surname
    cy.get('[placeholder="Doe"]').type("TEST1");
    this.passengerCheck();
    //fill birth day
    cy.get('[placeholder="MM"]').type("01");
    cy.get('[placeholder="DD"]').type("01");
    cy.get('[placeholder="YYYY"]').type("1999");
    this.passengerCheck();
    //fill phone number
    cy.get("._31PASOPl6kPy9Vrb5BjvUh").type("4155552672");
    cy.contains("Save & Continue").click();
  }
  emailCheck() {
    //check if customer can book without email
    cy.contains("save & continue", { timeout: 5000 }).first().click();
    cy.contains("Please enter your email address");
  }
  passengerCheck() {
    //check if customer can book without some needed string
    cy.contains("save & continue").last().click({ force: true });
    cy.contains("First name");
  }
  cashPayment() {
    //choose cash
    cy.contains("cash", { timeout: 30000 }).click();
  }
  passengerTextCheck() {
    cy.contains("passenger information");
    cy.contains("First name");
    cy.contains("Last name");
    cy.contains("Date of birth");
    cy.contains("Mobile phone");
    cy.contains(
      "1x check-in suitcase and 1x cabin luggage per passenger included"
    );
  }
  cardPayment() {
    //fill card info
    this.cardCheck();
    cy.get('[name="cardnumber"]').type("5555555555554444");
    this.cardCheck();
    cy.get('[placeholder="MM"]').type("01");
    this.cardCheck();
    cy.get('[placeholder="YY"]').type("22");
    this.cardCheck();
    cy.get('[placeholder="000"]').type("111");
    this.cardCheck();
    cy.get(".Select-placeholder").click();
    cy.get(".Select-option").eq(0).click();
  }
  customerCardPayment() {
    cy.get('[name="cardnumber"]').type("5555555555554444");
    cy.get('[placeholder="MM"]').type("01");
    cy.get('[placeholder="YY"]').type("22");
    cy.get('[placeholder="000"]').type("111");
  }
  cardCheck() {
    cy.contains("save & continue").last().click({ force: true });
    cy.contains("Credit card number");
  }
  paymentTextCheck() {
    cy.contains("cash").click();
    cy.contains("You've selected payment in cash to your driver.");
    cy.contains("in Cash on departure");
    cy.contains("debit card").click();
    cy.contains("Credit card number");
    cy.contains("Expiration date");
    cy.contains("Security code");
    cy.contains("TEST");
    cy.contains("TEST1");
    cy.contains("Country of residence");
  }
}
