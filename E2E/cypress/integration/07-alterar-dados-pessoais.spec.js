import faker from 'faker'

import { graphql_api } from '../../utils/graphql-request.service'
import { email, password} from './../../utils/user-constants'

const getUser = (email, password) => `{
  user(email: "${email}", password: "${password}") {
    name
    email
  }
}`

const newEmail = faker.internet.email()
const wrongPassword = faker.internet.password(12)
let name, newName;

describe('Alterar dados pessoais', () => {
  before(() => {
    cy.login()
    cy.get('#dropdown').click()
    cy.wait(1000)
    cy.get('#settings').click()
    cy.wait(1000)
  })
  
  it('Alterar usuário', () => {
    cy.location("pathname").should("eq", "/admin/settings")
    
    cy.get('input[name="name"]')
      .invoke('val')
      .then(text => name = text)

    cy.get('#name').type(' editado')

    cy.get('input[name="name"]')
    .invoke('val')
    .then(text => newName = text)

    cy.get('#email').clear()
    cy.get('#email').type(newEmail)
    cy.get('#password').type(wrongPassword)
    cy.get('#show-password').click()
    cy.get('#save-settings').click()
    
    cy.get('#text-alert').should('contain', 'Senha incorreta, tente novamente com outra senha.')
    cy.wait(3000)

    cy.get('#password').clear()
    cy.get('#password').type(password)
    cy.get('#save-settings').click()
    cy.get('#text-alert').should('contain', 'Dados pessoais alterados com sucesso!')
    cy.wait(3000)
  })

  it('Validar alteracao', async () => {
    try {
      await graphql_api(getUser(email, password))
    } catch (error) {
      expect(error.response.errors[0].message).to.be
        .equal(`No such user found for email: ${email}`)
    }

    const { user } = await graphql_api(getUser(newEmail, password))
    expect(user.name).to.be.equal(newName)
    expect(user.email).to.be.equal(newEmail)
  })
})

describe('Voltar dados pessoais', () => {
  before(() => {
    cy.login(newEmail)
    cy.get('#dropdown').click()
    cy.wait(1000)
    cy.get('#settings').click()
    cy.wait(1000)
  })

  it('Voltar usuário', () => {
    cy.get('#name').clear()
    cy.get('#name').type(name)
    cy.get('#email').clear()
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get('#show-password').click()
    cy.get('#save-settings').click()
    
    cy.get('#text-alert').should('contain', 'Dados pessoais alterados com sucesso!')
    cy.wait(3000)
  })

  it('Validar alteracao', async () => {
    try {
      await graphql_api(getUser(newEmail, password))
    } catch (error) {
      expect(error.response.errors[0].message).to.be
        .equal(`No such user found for email: ${newEmail}`)
    }

    const { user } = await graphql_api(getUser(email, password))
    expect(user.name).to.be.equal(name)
    expect(user.email).to.be.equal(email)
  })
})
