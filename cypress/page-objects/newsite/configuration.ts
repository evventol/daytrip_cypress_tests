/// <reference types = "cypress"/>
/// <reference types = "cypress-xpath"/>
export function checkPrice(CurNow:string, CurNext:string, price:string) {
    //change currency
    cy.contains(CurNow).click({ force: true })
    cy.contains(CurNext).click({ force: true })
        //check price in usd
    cy.contains('Book your trip').contains(price)
}

export function addStop(currency: string,number:number) {
    cy.wait(2000)
    cy.xpath('//*[@id="__next"]/div[2]/div[2]/div/div/div/div[2]/button').invoke('text').then(($bookBtn)=>{
        let bookPrice:number=+$bookBtn.slice($bookBtn.indexOf(currency)+1);
        cy.wait(500)
        cy.contains(bookPrice)
        cy.xpath(`//*[@id="__next"]/div[2]/div[1]/div/div[3]/div[${number}]/div/div[1]/button`).invoke('text').then(($locationAdd)=>{
            let locationPrice:number=+$locationAdd.slice($locationAdd.indexOf(currency)+1);
            cy.contains(locationPrice)
            cy.xpath(`//*[@id="__next"]/div[2]/div[1]/div/div[3]/div[${number}]/div/div[1]/button`).click()
            cy.wait(200)
            cy.contains(locationPrice+bookPrice)
            
        })
        cy.xpath(`//*[@id="__next"]/div[2]/div[1]/div/div[3]/div[${number}]/div/div[2]/div/h4`).invoke('text').then(($locationName)=>{
            cy.xpath(`//*[@id="__next"]/div[2]/div[2]/div/div/div/div[1]/div[2]/div[1]/div[3]/div[${number+1}]/div`).contains($locationName)
        })
        
        cy.xpath('//*[@id="__next"]/div[2]/div[2]/div/div/div/div[2]/button').should('not.contain',$bookBtn)
        cy.xpath(`//*[@id="__next"]/div[2]/div[1]/div/div[3]/div[${number}]/div/div[1]/div[2]/button`).contains('Cancel')
    })
}
export function vehicleMPVUpd(currency: string) {
    cy.xpath('//*[@id="__next"]/div[2]/div[2]/div/div/div/div[2]/div/div[2]/div/button').invoke('text').then(($mpvButton)=>{
        let mpvPrice:number=+$mpvButton.slice($mpvButton.indexOf(currency)+1);
        cy.contains(mpvPrice)
        cy.xpath('//*[@id="__next"]/div[2]/div[2]/div/div/div/div[2]/button').invoke('text').then(($bookBtn)=>{
            let bookPrice:number=+$bookBtn.slice($bookBtn.indexOf(currency)+1);
            cy.contains(bookPrice)
            cy.xpath('//*[@id="__next"]/div[2]/div[2]/div/div/div/div[2]/div/div[2]/div/button').click()
            cy.xpath('//*[@id="__next"]/div[2]/div[2]/div/div/div/div[2]/button').contains(bookPrice+mpvPrice)
    })
    })
}
export function finishConfiguration(lastPrice:number, lastWindow:boolean){
    cy.wait(1000)
    cy.get('button').contains(String(lastPrice), { timeout: 10000 }).click({ force: true });
    if (lastWindow==true){
        cy.contains('No sights selected', { timeout: 50000 }).should("be.visible")
        cy.wait(3000)
        cy.contains("Book without sights", { timeout: 50000 }).should("be.visible").click({ force: true })
    }
    cy.contains('Complete your booking', { timeout: 5000 }).should('be.visible')
}
export function nextDayConfiguration() {
    let time = Date.now();
    let timeDay = 86357407;
    time = time + timeDay;
    console.log(time);
    let configurationURL =
        "https://website.staging.mydaytrip.net/configurator?adults=2&children=0&currency=0&departureAt=" +
        time +
        "&isOtherDirection=true&luggage=2&passengers=2&routeId=7c939590-b3ae-4523-92b6-44189180d13a&vehicles=0";
    return configurationURL;
}
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })