/// <reference types = "cypress"/>
export class Location {
    createLocation(location:string,country:string){
        cy.contains('Locations').click({force:true})
        cy.contains('create location',{timeout:15000}).click()
        cy.contains('Created by',{timeout:15000}).should('be.visible')
        cy.get(':nth-child(1) > .LD7DlkRN6FoHhfiVesEkj > tbody > :nth-child(1) > td > span > input').type(location)
        cy.get(':nth-child(4) > .LD7DlkRN6FoHhfiVesEkj > tbody > :nth-child(4) > td > span > input').type('12')
        cy.get('#react-select-4--value > .Select-placeholder').type(country)
        cy.get('.Select-option').first().click()
        cy.wait(1000)
        cy.get('td > span > ._68rPnYXcz4bfOFK9ERjn9').click()
        cy.get(':nth-child(6) > td > span > input').clear()
        cy.get(':nth-child(6) > td > span > input').type(location)
        cy.contains('save').click()
        cy.contains('confirm').click()
        cy.contains('Routes containing',{timeout:15000}).should('be.visible')
    }
    removeLocation(){
        cy.contains('delete location').should('be.visible')
        cy.wait(3000)
        cy.contains('delete location').click()
        cy.contains('confirm').click()
    }
    setLocationReady(){
        let image="https://www.google.com/imgres?imgurl=https%3A%2F%2Fmakeawebsitehub.com%2Fwp-content%2Fuploads%2F2019%2F03%2Fgoogle-url-shortener-alternatives.png&imgrefurl=https%3A%2F%2Fmakeawebsitehub.com%2Fgoogle-url-shortener-alternatives%2F&tbnid=KYobtGU1jIvagM&vet=12ahUKEwibouPZp93uAhWrpYsKHVzSB0wQMygFegUIARCiAQ..i&docid=RoXJ6wiijzAJ_M&w=728&h=389&q=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0%20%D1%81%20%D0%BA%D0%BE%D1%80%D0%BE%D1%82%D0%BA%D0%B8%D0%BC%20url&ved=2ahUKEwibouPZp93uAhWrpYsKHVzSB0wQMygFegUIARCiAQ";
        cy.contains('edit').click()
        cy.get(':nth-child(1) > td > ._2kw2d9U8Rolop4q31Hdscc').click()
        cy.contains('add image').click()
        cy.get(':nth-child(2) > :nth-child(1) > .LD7DlkRN6FoHhfiVesEkj > tbody > ._34gVXLnMZ2ICCLr-aZ-_k9 > td > span > input').clear()
        cy.get(':nth-child(2) > :nth-child(1) > .LD7DlkRN6FoHhfiVesEkj > tbody > ._34gVXLnMZ2ICCLr-aZ-_k9 > td > span > input').type(image)
        cy.contains('purge image').click()
        cy.contains('save').click()
        cy.contains('confirm').click()


    }
}