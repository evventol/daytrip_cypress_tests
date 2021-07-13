/// <reference types = "cypress"/>
// @ts-check
import { Login } from "../../page-objects/management/login";
import { Navigation } from "../../page-objects/management/navigation";
import { Order } from "../../page-objects/management/order";
import { Assignation } from "../../page-objects/management/assignation";
import { orderDriver } from "../../page-objects/management/orderDriver";
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
        let price=ord.orderPrice(560)
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
        const dr = new orderDriver();
        login.driverRoot();
        dr.acceptVehicle();
        dr.changeVehicle();
    });
    it("C86 smoke-accept trip as company", () => {
        const dr = new orderDriver();
        login.companyRoot();
        dr.acceptDriver();
    });
    it("C87 smoke-cancelling order", () => {
        login.managerRoot();
        let i=0;
        for (i=1;i<9;i++){
            if (i == 5 || i == 6){
                continue;
            }
            navig.goToOrderPage(i);
            ord.cancelOrder();
        }
        login.unlogin()
    });
    it('C170 visit all major pages',()=>{
        let content=[['Countries','ISO'],['Locations','location '],['Routes','Route campaigns'],['Exports','export type'],['Translations','Batch'],['Numbering templates','Add']]
        let drivers=[['Companies','drivers company'],['Assignation','Pick a date at top'],['Payouts','Mangopay'],['Payouts tool','Transfers'],['Drivers balances','Generated CSV files'],['Drivers assignations','status'],['Vehicle models','Touran'],['Document types','Create document type']]
        let customers=[['Orders','Only Affiliate'],['Travel agents','%'],['Affiliate Partners','Search'],['Referral codes','referral from'],['Payments','Total count'],['Orders address check','Asked for correction'],['Blacklisted departures','Blacklisted departure dates']]
        login.managerRoot();
        content.forEach(page=>{
            cy.contains(page[0]).click({force:true})
            cy.contains(page[1],{timeout:20000}).should('be.visible')
            cy.wait(300)
        })
        drivers.forEach(page=>{
            cy.contains(page[0]).click({force:true})
            cy.contains(page[1],{timeout:20000}).should('be.visible')
            cy.wait(300)
        })
        customers.forEach(page=>{
            cy.contains(page[0]).click({force:true})
            cy.contains(page[1],{timeout:20000}).should('be.visible')
            cy.wait(300)
        })
    })
    it("Create BI",()=>{
        const driver = new Driver();
        let countries: any[][] = [['United State',1],['Italy',0],['India ',1],['Czech Republic',0],["Costa Rica",1]]
        login.managerRoot()
        cy.visit(Cypress.env('login_management')+'drivers', { timeout: 1200000 });
        driver.createDriver(countries[0][0])
        driver.createNewBI(0,countries[0])
        driver.removeDriver()

    })
    afterEach(() => {
        login.unlogin()
    })
});