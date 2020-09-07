Cypress.Commands.add('loginManag', () => {
    cy.request(
        'POST',
        'https://api.sandbox.mydaytrip.com/v1',
        {
            id: 0,
            service: "authentication",
            method: "authenticate",
            parameters: [
                'evventol@gmail.com',
                'gB8FqjkP'
            ]
        }
    )
        .then((resp) => {
            window.localStorage.setItem('jwtAut', resp.body.result.authentication)
            window.localStorage.setItem('jwtRefr', resp.body.result.refresh)
        })
})