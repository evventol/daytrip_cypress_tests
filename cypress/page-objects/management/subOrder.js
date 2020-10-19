/// <reference types = "cypress"/>

export class SubOrder {

    currentMonth() {
        let date = new Date();
        let numberOfMonth = date.getMonth();
        let months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        return months[numberOfMonth];
    }
    currentDay() {
        let date = new Date();
        let dateStr = date.toString();
        let sep = " ";
        let fullDate = dateStr.split(sep);
        let day = fullDate[0];
        return day;
    }
    currentYear() {
        let date = new Date();
        let year = date.getFullYear();
        return year;
    }
    checkText(stage) {
        if (stage == 0) {
            cy.contains("Basic info", { timeout: 6000 }).should("be.visible");
            cy.contains("TEST TEST1 <fake2@ondaytrip.com>", { timeout: 6000 }).should(
                "be.visible"
            );
            cy.contains("Prices", { timeout: 6000 }).should("be.visible");
            cy.contains("Locations", { timeout: 6000 });
            cy.contains("Sent emails", { timeout: 6000 });
            cy.contains("Payments & discounts", { timeout: 6000 }).should(
                "be.visible"
            );
            cy.contains("Passengers & drivers", { timeout: 6000 }).should(
                "be.visible"
            );
        } else if (stage == 1) {
            cy.contains("pending", { timeout: 6000 }).should("be.visible");
            //check origin exist
            cy.contains("cash selected", { timeout: 6000 }).should("be.visible");
            cy.contains("no content locations", { timeout: 3000 }).should(
                "be.visible"
            );
            cy.contains("There are no unassigned refund records.").should(
                "be.visible"
            );
            cy.contains("There are no financial operations").should("be.visible");
            cy.contains("No claim requests found").should("be.visible");
        }
    }
    clickOnStatusButton(position) {
        let button, confirmButton, status
        switch (position) {
            case "accept":
                {
                    button = "accept + "
                    confirmButton = "accept and send"
                    status = "accepted"
                    break;
                }
            case "confirm":
                {
                    button = "confirm + "
                    confirmButton = "confirm and send"
                    status = "confirmed"
                    break;
                }
            case "cancel":
                {
                    button = "cancel + "
                    confirmButton = "cancel and send"
                    status = "cancelled"
                    break;
                }
        }
        cy.contains(button, { timeout: 20000 }).click({
            force: true,
            timeout: 10000,
        });
        cy.contains(confirmButton, { timeout: 10000 }).click({
            force: true,
            timeout: 10000,
        });
        cy.contains(status, { timeout: 20000 })
    }

    chooseStringToWrite(stringType, stringName, partName, fullName) {
        let getTyp = "";
        if (stringType == 0) {
            getTyp = ".Select-value";
        } else if (stringType == 1) {
            getTyp = ".Select-placeholder";
        } else {
            console.log("incorrect type of get");
        }
        cy.get(getTyp, { timeout: 20000 })
            .contains(stringName, { timeout: 20000 })
            .click({ timeout: 20000 })
            .type(partName + "{enter}", {
                timeout: 10000,
            });
        cy.contains(fullName, { timeout: 10000 }).click({ force: true });
    }
    reloadPage() {
        cy.reload()
        cy.contains('pick-up', { timeout: 20000 }).should('be.visible')

    }
}