import { email, password} from './../../utils/user-constants'

Cypress.Commands.add('login', (userEmail = email, userPassword = password) => {
  cy.visit('http://localhost:3000/auth/login')
  cy.get('#email').type(userEmail)
  cy.get('#password').type(userPassword)
  cy.get('#show-password').click()
  cy.get('#login').click()
  cy.wait(5000)
})
