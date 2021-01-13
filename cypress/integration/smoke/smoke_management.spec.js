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
    let locatoins=[["bramber", "Bramberg, Austria", "min"],]
    let vehicle=["sedan","Mpv","Van"]
    beforeEach(() => {
        cy.visit(Cypress.env('login_management'), { timeout: 1200000 });

    });
    it("C83 smoke-create&change order", () => {
        let price=ord.orderPrice(559)
        login.managerRoot();
        navig.goToNewOrderPage();
        ord.fillInfoOfOrder(0, 1);
        ord.assignVehicle(vehicle[0], price[0].toString());
        ord.checkPriceCreateOrder(price);
        ord.editOrder();
        ord.editLocation(1, locatoins[0]);
        ord.acceptAndConfirmOrder()
        ord.assignDriver("yev", "Yev RM");
        ord.createPaymentRequest()
            //ord.payPaymentRequest()
    });
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
        navig.goToOrderPage(0);
        ord.cancelOrder();
        login.unlogin()
    });
    it('create order with location', () => {
        let price=ord.orderPrice(837)
        login.managerRoot();
        navig.goToNewOrderPage();
        ord.fillInfoOfOrder(0, 1);
        ord.editLocation(0, locatoins[0]);
        ord.assignVehicle(vehicle[0], price[0].toString());
        ord.checkPriceCreateOrder(price);
        ord.cancelOrder();
    })


    afterEach(() => {
        login.unlogin()
    })
});