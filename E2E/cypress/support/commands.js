Cypress.Commands.add('login', (email = 'fernando@gmail.com', password = "%fernando%123") => {
  cy.visit('http://localhost:3000/auth/login')
  cy.get('#email').type(email)
  cy.get('#password').type(password)
  cy.get('#show-password').click()
  cy.get('#login').click()
  cy.wait(5000)
})
