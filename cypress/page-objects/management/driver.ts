/// <reference types = "cypress"/>

export class Driver{
    createDriver(country:string){
        cy.contains('create driver',{timeout:10000}).click()
        cy.contains('first name',{timeout:10000}).should('be.visible')
        //first name
        cy.get('.O2m8wnP4mxAUCWdXb-eZm._23jLYCEYghRlb53-0R2fBf > :nth-child(2) > span > input').type('yev')
        let rand=Math.floor(Math.random()*10000)
        //last name
        cy.get('.O2m8wnP4mxAUCWdXb-eZm.qAk6fdzdEg9p1f59c9KQJ > :nth-child(2) > span > input').type(rand.toString())
        //email
        cy.get(':nth-child(3) > :nth-child(2) > span > input').type('ev.test.ve+driv'+rand+'@gmail.com')
        //phone number
        cy.get('.ARSioau9D27r9hdoHwpHr._3UL1EPv-7lLafaffORtp7a > :nth-child(2) > span > input').type('1111111111')
        //country
        cy.get('.Select-placeholder').eq(1).click().type(country)
        cy.get('.Select-option').first().click()
        cy.contains('create').click()
        cy.contains('confirm').click()
        cy.contains('Created at:',{timeout:10000}).should('be.visible')
    }
    activiteDriver(){
        cy.get('._2Mg2sOHh_RwI78WmpEU0ku > :nth-child(1) > a',{timeout:10000}).click()
        cy.contains('Created at:',{timeout:10000}).should('be.visible')
        cy.contains('Active',{timeout:10000}).click({force:true})
        cy.contains('confirm').click({force:true})
        cy.get('._38eu0YWP0l1WlPQV2HkJtw').contains('Active').should('be.visible')

    }
    editDriver(){
        cy.contains('edit').click()
        cy.get('.O2m8wnP4mxAUCWdXb-eZm._23jLYCEYghRlb53-0R2fBf > :nth-child(2) > span > input').type('s')
        cy.contains('save').click()
        cy.wait(100)
        cy.contains('confirm').click({force:true})
        cy.contains('edit',{timeout:10000}).should('be.visible')
    }
    removeDriver(){
        cy.get('._2Mg2sOHh_RwI78WmpEU0ku > :nth-child(1) > a',{timeout:10000}).click()
        cy.contains('Created at:',{timeout:10000}).should('be.visible')
        cy.get('._68rPnYXcz4bfOFK9ERjn9').last().click()
        cy.contains('confirm').click()
    }
    addNewVehicle(brand:string,model:string){
        cy.contains('Vehicles').click()
        cy.contains('add a new car').click()
        cy.contains('vehicle make').type(brand)
        cy.get('.Select-option').first().click()
        cy.contains('vehicle model').type(model)
        cy.get('.Select-option').first().click()
        cy.contains('save').click()
        cy.get('.Select-placeholder').first().type('2020')
        cy.get('.Select-option').first().click()
        cy.get('span > input').type('1111')
        cy.get('[style="background-color: rgb(0, 0, 0);"]').click()
        cy.contains('save').click()
        cy.contains('confirm').click()
        cy.wait(1000)
        cy.contains('approve').click()
        cy.contains('confirm').click()
        cy.contains('approved',{timeout:10000}).should('be.visible')
    }
    createNewBI(type:number, country:string){
        //type: 0-soletraider,1-legal person, 2-natural person
        cy.contains('Billing information').should('be.visible').click()
        if (type==0){
            cy.contains('new soletrader').click({force:true})
            cy.get(':nth-child(1) > ._3fZsBXjrv_KTSQgEq7HwDk._1VOkgeBRI4HAB2q7pVmx9m > :nth-child(2) > span > input').type('yev soletraider')

        }
        else if(type==1){
            cy.contains('new legal person').click({force:true})
            cy.get(':nth-child(1) > ._3fZsBXjrv_KTSQgEq7HwDk._1VOkgeBRI4HAB2q7pVmx9m > :nth-child(2) > span > input').type('yev legal')


        }
        else if(type==2){

        }
        else{
            console.log('err')
        }
        cy.get(':nth-child(1) > :nth-child(2) > :nth-child(2) > span > input').type('ev.test.ve+123@gmail.com')
        cy.get('.Select-placeholder').first().click().type(country)
        cy.get('.Select-option').first().click()
        cy.get(':nth-child(1) > :nth-child(4) > :nth-child(2) > span > input').type('123456789')
        if (country=='United State'){
        cy.get('._39cHKBXr35SBOnpDQuyzjZ > :nth-child(2) > ._28KrO56ecPUAkrhgPSf83E > :nth-child(2) > span > input').type('123456789')
        //fill ABA
        cy.get(':nth-child(3) > ._3fZsBXjrv_KTSQgEq7HwDk > :nth-child(2) > span > input').type('11111111')

        }
        else{//fill IBAN
            cy.get('._28KrO56ecPUAkrhgPSf83E > ._3fZsBXjrv_KTSQgEq7HwDk > :nth-child(2) > span > input').type('IT60X0542811101000000123456')
        }
        cy.get('._39cHKBXr35SBOnpDQuyzjZ > :nth-child(4) > :nth-child(2) > span > input').type('yev')
        cy.get('._39cHKBXr35SBOnpDQuyzjZ > :nth-child(5) > :nth-child(2) > span > input').type('test')
        cy.get('.Select-placeholder').first().click()
        cy.get('.Select-option').first().click()
        cy.get('.Select-placeholder').first().click().type(country)
        cy.get('.Select-option').first().click()
        cy.get('.Select-placeholder').first().click().type(country)
        cy.get('.Select-option').first().click()
        cy.get('.W5RuKj834sf42HdrTE0E5 > ._3fZsBXjrv_KTSQgEq7HwDk._1VOkgeBRI4HAB2q7pVmx9m > :nth-child(2) > span > input').type('1 2 3')
        cy.get('.W5RuKj834sf42HdrTE0E5 > :nth-child(4) > :nth-child(2) > span > input').type("NY")
        cy.get('.W5RuKj834sf42HdrTE0E5 > :nth-child(5) > :nth-child(2) > span > input').type("ME")
        cy.get('.W5RuKj834sf42HdrTE0E5 > :nth-child(6) > :nth-child(2) > span > input').type('11111')
        cy.get('.Select-placeholder').first().click().type(country)
        cy.get('.Select-option').first().click()
        cy.get('._38TLix94Eg3g4bHzzWTm7b').click()
        if (type==1){//if we fill legal person, we should fill UBO
            this.fillUBO(country)
        }
        //save BI
        cy.contains('save & set active').click()
        cy.contains('confirm').click()
        cy.contains('Active billing information').should('be.visible')
        // //go to profile page
        // cy.get('._2Mg2sOHh_RwI78WmpEU0ku > :nth-child(1) > a',{timeout:10000}).click()

    }
    fillUBO(country:string){
        cy.contains('add shareholder info').click()
        cy.get('._1qtDmOkqPiXi09p5JxjiWN > :nth-child(1) > :nth-child(1) > :nth-child(2) > span > input').type('yev')
        cy.get('._1qtDmOkqPiXi09p5JxjiWN > :nth-child(1) > .ARSioau9D27r9hdoHwpHr._28KrO56ecPUAkrhgPSf83E > :nth-child(2) > span > input').type('UBO')
        cy.get(':nth-child(3) > ._3fZsBXjrv_KTSQgEq7HwDk._1VOkgeBRI4HAB2q7pVmx9m > :nth-child(2) > span > input').type('1 2 3')
        cy.get(':nth-child(3) > :nth-child(3) > :nth-child(2) > span > input').type('NY')
        cy.get(':nth-child(3) > :nth-child(4) > :nth-child(2) > span > input').type('ME')
        cy.get(':nth-child(3) > :nth-child(5) > :nth-child(2) > span > input').type('11111')
        cy.get('.Select-placeholder').first().type(country)
        cy.get('.Select-option').first().click()
        cy.get('.Select-placeholder').first().type('1')
        cy.get('.Select-option').first().click()
        cy.get('.Select-placeholder').first().type('1')
        cy.get('.Select-option').first().click()
        cy.get('.Select-placeholder').first().type('2000')
        cy.get('.Select-option').first().click()
        cy.get('.Select-placeholder').first().type(country)
        cy.get('.Select-option').first().click()
        cy.get('.Select-placeholder').first().type(country)
        cy.get('.Select-option').first().click()
        cy.get(':nth-child(6) > ._3fZsBXjrv_KTSQgEq7HwDk > :nth-child(2) > span > input').type('ENN')

    }
}