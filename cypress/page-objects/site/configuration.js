/// <reference types = "cypress"/>
export class Configuration {
	bookWithoutLocation() {
		//contains location sector
		cy.contains('sights you can visit along the way')
		//add 3d person
		cy.get('._3bbJo1E02JnUudnyqHI1Ty', { timeout: 5000 }).click()
		cy.get('._3BJ0Skk3qqIJE2ZmQdXhAz').contains("3",{timeout:10000})
		//choose lux sedan
		cy.get('._38TLix94Eg3g4bHzzWTm7b').click()
		//go next
		cy.get('button').contains('book this trip').click()
		cy.contains('Your itinerary is empty!', { timeout: 5000 }).should('be.visible')
		cy.get('button').contains('book with no stops').click()
		cy.contains('options & checkout',{timeout:50000})
	}
	nextDay(){
		let time = Date.now();
		let timeDay = 86357407;
		time = time + timeDay;
		console.log(time);
		return time
	}
	nextDayConfiguration() {
		
		let configurationURL =
		  "https://sandbox.mydaytrip.com/configurator?routeId=dc787d17-8146-438a-9be7-07fe1153b354&isOtherDirection=true&departureAt=" +
		  this.nextDay() +
		  "&passengers=2&vehicles=0";
		return configurationURL;
	  }
	bookLocation() {
		cy.contains('sights you can visit along the way',{ timeout: 10000 })
		cy.contains('Terezin',{ timeout: 10000 }).should('be.visible')
		cy.contains('Terezin',{ timeout: 5000 }).click()
		cy.wait(1000)
		//add 3d person
		cy.get('._3bbJo1E02JnUudnyqHI1Ty', { timeout: 5000 }).click()
		cy.get('._3BJ0Skk3qqIJE2ZmQdXhAz').contains("3",{timeout:10000})
		//add 4d person
		cy.get('._3bbJo1E02JnUudnyqHI1Ty', { timeout: 5000 }).click()
		cy.get('._3BJ0Skk3qqIJE2ZmQdXhAz').contains("4",{timeout:10000})
		//choose lux sedan
		cy.get('._38TLix94Eg3g4bHzzWTm7b').click()
		cy.get('button').contains('book this trip').click()
		cy.contains('options & checkout',{timeout:50000})
	}
	navigateToConfiguratorPage() {
		const confirmPage = "https://sandbox.mydaytrip.com/configurator?departureAt=1637226000000&isOtherDirection=true&passengers=2&routeId=dc787d17-8146-438a-9be7-07fe1153b354&vehicles=0"
		//go to confirm page
		cy.visit(confirmPage)
	}
}
