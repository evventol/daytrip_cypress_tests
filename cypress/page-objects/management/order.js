/// <reference types = "cypress"/>
import { SubOrder } from "../../page-objects/management/subOrder";
const subOrd = new SubOrder();
export class Order {

    fillInfoOfOrder(origin, destination) {
        let locations = [
                ["lviv", "Lviv, Ukrain"],
                ["vienna", "Vienna, Austria"],
                ['brno', 'Brno, Czech Republic'],
                ['paris', 'Paris, France'],
                ['malaga', 'Malaga, Spain'],
                ['prague', "Prague, Czech Republic"],
                ["portland", "Portland, OR, United States"],
                ['los angeles', 'Los Angeles, CA, United States'],
                ['boston', 'Boston, MA, United States'],
                ['san francisco', 'San Francisco, CA, United States']
            ]
            //subOrd.checkText(0);
            //change month
        let month = subOrd.currentMonth();
        subOrd.chooseStringToWrite(0, month, "may", "May");
        //change year
        let year = subOrd.currentYear();
        subOrd.chooseStringToWrite(0, year, "2022", "2022");
        //Prague - origin
        subOrd.chooseStringToWrite(1, "origin", locations[origin][0], locations[origin][1]);
        //destination
        subOrd.chooseStringToWrite(1, "destination", locations[destination][0], locations[destination][1]);
    }
    assignVehicle(typeVeh, priceVeh) {
        cy.get("button")
            .contains("set recommended configuration ", { timeout: 5000 })
            .click();
        cy.contains("confirm", { timeout: 5000 }).click({ timeout: 5000 });
        cy.contains(typeVeh + " " + priceVeh, { timeout: 10000 }).should('be.visible')
    }
    checkPriceCreateOrder(price) {
        //check price
        cy.contains(price, { timeout: 10000 });
        //create order
        cy.get("button", { timeout: 5000 })
            .contains("create", { timeout: 5000 })
            .click();
        cy.contains("confirm").click();
        cy.contains("Created at:", { timeout: 30000 });
    }
    editLocation(type, shortName, fullName, distance) {
        //0- while creatng order
        //1 - after creating order
        if (type == 1) {
            cy.contains('status', { timeout: 20000 }).should('be.visible')
            cy.get("button", { timeout: 20000 }).contains("edit", { timeout: 20000 }).click();
            cy.contains('status', { timeout: 10000 }).should("be.visible")
            cy.get('#react-select-12--value > .Select-placeholder', { timeout: 10000 }).type(shortName);
        } else {
            cy.contains('status', { timeout: 10000 }).should("be.visible")
            cy.get('#react-select-21--value > .Select-placeholder', { timeout: 10000 }).type(shortName);

        }
        cy.contains(fullName, { timeout: 5000 }).click({ force: true });
        cy.get("button").contains(" add location from list").click();
        cy.contains(distance, { timeout: 50000 });
        if (type == 1) {
            cy.contains("save", { timeout: 10000 }).click();
            cy.contains("confirm", { timeout: 5000 }).click();
            cy.wait(500)
            subOrd.reloadPage();
        }
    }
    acceptAndConfirmOrder() {
        //accept trip
        subOrd.clickOnStatusButton("accept");
        //confirm trip
        subOrd.clickOnStatusButton("confirm");
        subOrd.reloadPage();
    }
    editOrder() {
        cy.wait(2000);
        subOrd.checkText(1);
        //edit info & location
        cy.get("button").contains("edit").click();
        subOrd.chooseStringToWrite(0, "May", "april", "April");
        cy.contains("save", { timeout: 10000 }).click();
        cy.contains("confirm", { timeout: 1000 }).click();
        subOrd.reloadPage();
    }

    assignDriver(short_name, full_name) {
        //type firsts lettets of driver
        cy.contains("Select...", { timeout: 10000 }).type(short_name);
        //choose driver
        cy.contains(full_name, { timeout: 10000 }).click();
        cy.get("._68rPnYXcz4bfOFK9ERjn9")
            .contains("assign", { timeout: 10000 })
            .click();
        cy.get("._3czy54h9HtAiW338leF2yy > :nth-child(2)").click();
        cy.contains('Pending', { timeout: 15000 }).should('be.visible')
        subOrd.reloadPage();
    }
    createPaymentRequest() {
        cy.contains('create payment request', { timeout: 10000 }).click()
        cy.contains('Create payment request', { timeout: 10000 }).should('be.visible')
        cy.get('textarea').type('description')
        cy.get('span > input').type(100)
        cy.contains('create payment request').click()
        cy.contains('payment request url', { timeout: 10000 })

    }
    payPaymentRequest() {
        cy.get('#paymentRequestLink0').as('text')
        cy.visit(text)
            // cy.get('#paymentRequestLink0').then(($div)=>{
            //   let link = $div.text()
            //   console.log(link)
            //   cy.visit(link)
            // })
    }
    cancelOrder() {
        subOrd.reloadPage();
        subOrd.clickOnStatusButton(
            "cancel"
        );
    }
}