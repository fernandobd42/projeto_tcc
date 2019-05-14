import faker from 'faker'

import { graphql_api } from '../../utils/graphql-request.service'

const getUser = (email, password) => `{
  user(email: "${email}", password: "${password}") {
    email
  }
}`

const email = 'fernando@gmail.com'
const password = '%fernando%123'
const newPassword = faker.internet.password(12)

describe('Alterar senha', () => {
  before(() => {
    cy.login()
    cy.get('#dropdown').click()
    cy.wait(1000)
    cy.get('#settings').click()
    cy.wait(1000)
  })
  
  it('Alterar senha do usuário', () => {
    cy.get('#change-password').click()

    cy.get('#new-password').type(newPassword)
    cy.get('#confirm-new-password').type(newPassword)
    cy.get('#current-password').type(newPassword)
    cy.get('#show-password').click()
    cy.get('#save-password').click()
    
    cy.get('#text-alert').should('contain', 'Senha incorreta, tente novamente com outra senha.')
    cy.wait(3000)

    cy.get('#current-password').clear()
    cy.get('#current-password').type(password)
    cy.get('#save-password').click()
    cy.get('#text-alert').should('contain', 'Senha alterada com sucesso!')
    cy.wait(3000)
  })

  it('Validar alteracao', async () => {
    try {
      await graphql_api(getUser(email, password))
    } catch (error) {
      expect(error.response.errors[0].message).to.be.equal('Invalid password')
    }

    const { user } = await graphql_api(getUser(email, newPassword))
    expect(user.email).to.be.equal(email)
  })
})

describe('Voltar senha', () => {
  before(() => {
    cy.login(email, newPassword)
    cy.get('#dropdown').click()
    cy.wait(1000)
    cy.get('#settings').click()
    cy.wait(1000)
  })
  
  it('Voltar senha do usuário', () => {
    cy.get('#change-password').click()

    cy.get('#new-password').type(password)
    cy.get('#confirm-new-password').type(password)
    cy.get('#current-password').type(newPassword)
    cy.get('#save-password').click()
    cy.get('#text-alert').should('contain', 'Senha alterada com sucesso!')
    cy.wait(3000)
  })

  it('Validar alteracao', async () => {
    try {
      await graphql_api(getUser(email, newPassword))
    } catch (error) {
      expect(error.response.errors[0].message).to.be.equal('Invalid password')
    }

    const { user } = await graphql_api(getUser(email, password))
    expect(user.email).to.be.equal(email)
  })
})
