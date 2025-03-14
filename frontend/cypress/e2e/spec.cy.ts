describe('Play Game', () => {
  it('Go to login', () => {
    cy.intercept('POST', 'http://localhost:4000/api/users/login', {
      data: {
        token: 'abc123',
        userID: '123'
      }
    })

    cy.visit('http://192.168.68.103:5173/');

    cy.url().should('include', '/login');

    cy.get('[data-testid="username-input"]').type('fake@email.com')

    cy.get('[data-testid="password-input"]').type('Test1234#')

    cy.get('[data-testid="login-btn"]').click()

    cy.url().should('include', '/play');

    cy.contains('Play').click()

    cy.contains('Easy').click()

    cy.contains('Accept').click()

    cy.wait(2000)

    cy.get('[data-testid="card-container"]:has(div div img[src="/images/comet.png"])').eq(0).click()

    cy.wait(1000)

    cy.get('[data-testid="card-container"]:has(div div img[src="/images/comet.png"])').eq(1).click()

    cy.wait(1000)

    cy.get('[data-testid="card-container"]:has(div div img[src="/images/meteor.png"])').eq(0).click()

    cy.wait(1000)

    cy.get('[data-testid="card-container"]:has(div div img[src="/images/meteor.png"])').eq(1).click()

    cy.wait(1000)

    // cy.get('[data-testid="card-container"]:has(img[src="/images/comet.png"])').each(elem => {
    //   elem.click();
    //   return new Cypress.Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve()
    //     }, 1000)
    //   })
    // })
    //
    // cy.get('[data-testid="card-container"]:has(img[src="/images/meteor.png"])').each(elem => {
    //   elem.click();
    //   return new Cypress.Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve()
    //     }, 1000)
    //   })
    // })

    cy.url().should('include', '/congt-easy');
  })
})
