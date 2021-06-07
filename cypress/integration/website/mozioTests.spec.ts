/// <reference types = "cypress"/>
describe('mozio tests',()=>{
    beforeEach(()=>{
        cy.visit("https://app-testing.mozio.com/en-us/", { timeout: 3000000 })
        cy.contains('Accept All').click()
    })
    it('Europe booking',()=>{
        cy.get("#start_address").type('Prague')
        cy.contains("Prague, Czechia").click()
        cy.get("#end_address").type('Berlin')
        cy.contains('Berlin, Germany').click()
        cy.contains("Search").click()
        cy.contains('Sedan',{timeout:20000})
        cy.visit('https://app-testing.mozio.com/en-us/search?start_address=Prague%2C%20Czechia&end_address=Berlin%2C%20Germany&pickup_datetime=10%2F21%2F2021%2001%3A00%20PM&mode=one_way&num_passengers=1&currency=USD&return_pickup_datetime=05%2F28%2F2022%2001%3A00%20PM')
        cy.contains('Daytrip').parent().parent().parent().parent().contains('Book Ride').click()
        cy.contains('Almost done booking!',{timeout:20000}).should('be.visible')
        cy.get("input[name='ci__first_name']").click()

        cy.get("input[name='ci__first_name']").type('test')
        cy.get('input[name="ci__last_name"]').type('test')
        cy.get('input[name="ci__email"]').type('ev.test.ve@gmail.com')
        cy.get('input[name="ci__email_confirmation"]').type('ev.test.ve@gmail.com')
        cy.get('input[name="ci__phone_number"]').type('4155512345')
        cy.contains('Enter Credit Card Details').click()
        cy.get('input[name="fname"]').type('Test')
        cy.get('input[name="lname"]').type('Test')
        cy.contains('Card number').click()
        cy.get('.bv > .moz-base-field > .moz-base-field__content > .b7 > .moz-base-field__input > .moz-input__inline > .StripeElement > .__PrivateStripeElement > iframe').parent().find('input').type('5555555555554444',{force:true})
        //cy.get('#root > form > span:nth-child(4) > div > div.CardNumberField-input-wrapper > span > input').first().type('5555555555554444',{force:true})
//
        cy.contains('Expires').type('1222',{force:true})
        cy.contains('Card cvc').type('111',{force:true})
        cy.get('button').contains('Book').click()

    })
})