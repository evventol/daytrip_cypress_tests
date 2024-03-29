/// <reference types = "cypress"/>
import { SubOrder } from "./subOrder";
const subOrd = new SubOrder();
export class Order {

    fillInfoOfOrder(origin:number, destination:number) {
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
        subOrd.checkText(0);
        //change month
        let month = subOrd.currentMonth();
        subOrd.chooseStringToWrite(0, month.toString(), "may", "May");
        //change year
        let year = subOrd.currentYear();
        cy.contains(year).should('be.visible')
        subOrd.chooseStringToWrite(0, year.toString(), "2022", "2022");
        //Prague - origin
        subOrd.chooseStringToWrite(1, "origin", locations[origin][0], locations[origin][1]);
        //destination
        subOrd.chooseStringToWrite(1, "destination", locations[destination][0], locations[destination][1]);
    }
    orderPrice(driverPrive:number){
        //calculation of prices on order page
        let ourPrice= Math.floor(driverPrive/3.985)
        let totalPrice= driverPrive+ourPrice;
        let price=[driverPrive,ourPrice,totalPrice]
        return price
    }
    assignVehicle(typeVeh:string, priceVeh:string) {
        cy.get("button")
            .contains("set recommended configuration ", { timeout: 5000 })
            .click();
        cy.contains("confirm", { timeout: 5000 }).click({ timeout: 5000 });
        cy.contains(typeVeh + " €" + priceVeh, { timeout: 20000 }).should('be.visible')
    }
    checkPriceCreateOrder(price:any) {
        let totalPriceString=price[0].toString()+" + "+price[1].toString()+" = "+price[2].toString()
        //check price
        cy.contains(totalPriceString, { timeout: 10000 });
        //create order
        cy.get("button", { timeout: 5000 })
            .contains("create", { timeout: 5000 })
            .click();
        cy.contains("confirm").click();
        cy.contains("Created at:", { timeout: 30000 });
    }
    editLocation(type:number, location:any) {
        //0- while creatng order
        //1 - after creating order
        if (type == 1) {
            cy.contains('status', { timeout: 20000 }).should('be.visible')
            cy.get("button", { timeout: 20000 }).contains("edit", { timeout: 20000 }).click();
            cy.contains('status', { timeout: 10000 }).should("be.visible")
            cy.get('#react-select-12--value > .Select-placeholder', { timeout: 10000 }).type(location[0]);
        } else {
            cy.contains('status', { timeout: 10000 }).should("be.visible")
            cy.get('#react-select-21--value > .Select-placeholder', { timeout: 10000 }).type(location[0]);

        }
        cy.contains(location[1], { timeout: 5000 }).click({ force: true });
        cy.get("button").contains(" add location from list").click();
        cy.contains(location[2], { timeout: 50000 });
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

    assignDriver(short_name:string, full_name:string) {
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
        cy.get('span > input').type('100')
        cy.contains('create payment request').click()
        cy.contains('payment request url', { timeout: 10000 })

    }
    payPaymentRequest(text:string) {
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