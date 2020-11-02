/// <reference types = "cypress"/>
import { Login } from "../../page-objects/management/login";

describe("creating content", () => {
    const login = new Login();
    beforeEach(() => {
        cy.visit("https://management.sandbox.mydaytrip.com/#/", { timeout: 1200000 });
        login.managerRoot()
    })
    it('Create location', () => {

    })
})