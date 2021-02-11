/// <reference types = "cypress"/>
export class Route {
    createRoute(origin:string,destination:string){
        cy.contains("Routes").click({force:true})
        cy.contains('create route',{timeout:15000}).click()
        cy.contains('Basic info',{timeout:15000}).should('be.visible')
        cy.get('.Select-placeholder').first().type(origin)
        cy.get('.Select-option').first().click()
        cy.get('.Select-placeholder').first().type(destination)
        cy.get('.Select-option').first().click()
        cy.wait(5000)
        cy.get('input').eq(4).type('200')
        cy.get(':nth-child(1) > td > span > input').type('222')
        cy.get(':nth-child(3) > td > span > input').type('333')
        cy.get(':nth-child(5) > td > span > input').type('444')

        cy.contains('save').click()
        cy.contains('confirm').click()
    }
    editRoute(){
        cy.contains('edit').click()
        cy.contains('recalculate prices').click()
        cy.contains('prices recalculated',{timeout:15000}).should('be.visible')
        cy.get(':nth-child(1) > td > span > input').clear()
        cy.wait(200)
        cy.get(':nth-child(3) > .LD7DlkRN6FoHhfiVesEkj > tbody > :nth-child(1) > td > span > input').type('111')
        cy.contains('save').click()
        cy.contains('confirm').click()

    }
    removeRoute(){
        cy.contains('Basic info',{timeout:15000}).should('be.visible')
        cy.contains('delete route').click()
        cy.contains('confirm').click()
    }
}