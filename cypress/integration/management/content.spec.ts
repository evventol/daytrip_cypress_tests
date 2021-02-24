/// <reference types = "cypress"/>
import { Login } from "../../page-objects/management/login";
import { Location } from "../../page-objects/management/location";
import { Route } from "../../page-objects/management/route";

describe("creating content", () => {
    const login = new Login();
    beforeEach(() => {
        cy.visit("https://management.sandbox.mydaytrip.com/#/", { timeout: 1200000 });
        login.managerRoot()
    })
    it('Create&edit location', () => {
        const loc=new Location()
        loc.createLocation('lviv',"Ukraine")
        loc.setLocationReady()
        loc.removeLocation()
    })

    it('Create&edit route',()=>{
    const route=new Route()
    route.createRoute('lviv','luxembourg')
    route.editRoute()
    route.removeRoute()
    })

})