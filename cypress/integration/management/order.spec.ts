/// <reference types = "cypress"/>
import { Login } from "../../page-objects/management/login";
import { Navigation } from "../../page-objects/management/navigation";
import { Order } from "../../page-objects/management/order";
import { Assignation } from "../../page-objects/management/assignation";
import { Driver } from "../../page-objects/management/driver";
describe('Management order', () => {
    const login = new Login();
    const navig = new Navigation();
    const ord = new Order();
    beforeEach(() => {
        cy.visit(Cypress.env('login_management'), { timeout: 1200000 });

    });
    it('add booking', () => {
        login.managerRoot();
        let i = 0;
        let j = 0;
        let price = [0,0,0];
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (i == j) {
                    continue;
                }

                navig.goToNewOrderPage();
                cy.wait(1000)
                ord.fillInfoOfOrder(i, j);
                ord.assignVehicle("sedan", " ");
                cy.wait(3000)
                //will fix
                ord.checkPriceCreateOrder(price);
                cy.wait(1000)
                ord.acceptAndConfirmOrder()
                cy.wait(1000)
            }
        }
        for (i = 6; i < 8; i++) {
            for (j = 6; j < 8; j++) {
                if (i == j) {
                    continue;
                }
                navig.goToNewOrderPage();
                cy.wait(1000)
                ord.fillInfoOfOrder(i, j);
                ord.assignVehicle("sedan", " ");
                cy.wait(1000)
                //will fix
                ord.checkPriceCreateOrder(price);
                cy.wait(1000)
                ord.acceptAndConfirmOrder()
                cy.wait(1000)
            }
        }

    })
})