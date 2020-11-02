/// <reference types = "cypress"/>
import { Login } from "../../page-objects/management/login";
import { Navigation } from "../../page-objects/management/navigation";
import { Order } from "../../page-objects/management/order";
import { Assignation } from "../../page-objects/management/assignation";
import { Driver } from "../../page-objects/management/driver";

describe("Smoke management", () => {
    const login = new Login();
    const navig = new Navigation();
    const ord = new Order();

    beforeEach(() => {
        cy.visit("https://management.sandbox.mydaytrip.com/#/", { timeout: 1200000 });

    });

    it("C83 smoke-create&change order", () => {
        login.managerRoot();
        navig.goToNewOrderPage();
        ord.fillInfoOfOrder();
        ord.assignVehicle();
        ord.checkPriceCreateOrder(" ");
        ord.editOrder();
        ord.editLocation(1, "bramber", "Bramberg, Austria", "min");
        ord.acceptAndConfirmOrder()
        ord.assignDriver("yev", "Yev RM");
        ord.createPaymentRequest()
            //ord.payPaymentRequest()
    });
    it('create order with location', () => {
        login.managerRoot();
        navig.goToNewOrderPage();
        ord.fillInfoOfOrder();
        ord.editLocation(0, "bramber", "Bramberg, Austria", "539 min (861 km)");
        ord.assignVehicle();
        ord.checkPriceCreateOrder("834 + 209 = 1043");
        ord.cancelOrder();
    })
    it("C84 smoke-assign tools", () => {
        const at = new Assignation();
        login.managerRoot();
        navig.goToAssignationToolsPage();
        at.assignDriver();
        at.assignCompany();
    });
    it("C85 smoke-accept trip as driver", () => {
        const dr = new Driver();
        login.driverRoot();
        dr.acceptVehicle();
        dr.changeVehicle();
    });
    it("C86 smoke-accept trip as company", () => {
        const dr = new Driver();
        login.companyRoot();
        dr.acceptDriver();
    });
    it("C87 smoke-cancelling order", () => {
        login.managerRoot();
        cy.wait(5000);
        navig.goToOrderPage(0);
        ord.cancelOrder();
        cy.wait(5000);
        navig.goToOrderPage(2);
        ord.cancelOrder();
        cy.wait(5000);
        navig.goToOrderPage(3);
        ord.cancelOrder();
    });
    afterEach(() => {
        login.unlogin()
    })
});