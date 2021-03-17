/// <reference types = "cypress"/>

export function loginToCI() {
  cy.visit("https://sandbox.mydaytrip.com/customer/login");
  cy.get('input[type="email"]').type("ev.test.ve+1888@gmail.com");
  cy.get('input[type="password"]').type("9EFFCC");
  cy.get("button").contains("Go to my trips").click();
  cy.wait(500);
  cy.request(
    "https://api.sandbox.mydaytrip.com/verifyCustomerEmail?bookingRef=66A0C0&code=774025&email=ev.test.ve%2B1888%40gmail.com&utm_source=CS-transactional&utm_medium=email&utm_campaign=email-verification&utm_term=verify"
  );
  cy.reload(true);
  cy.wait(2000);
}
export function goToCI() {
  cy.visit("https://sandbox.mydaytrip.com/customer/upcoming-trips");
  cy.reload(true);
  cy.wait(20000);
}

