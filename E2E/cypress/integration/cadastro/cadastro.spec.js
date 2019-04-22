import faker from 'faker'

import { graphql_api } from '../../../utils/graphql-request.service'

const emailUsed = email => `{
  emailAlreadyUsed(email: "${email}")
}`;

const name = faker.name.findName()
const email = faker.internet.email()
const senha = faker.internet.password(10)

describe('Cadastrar Usuário', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/register')

    cy.get('#name').type(name)
    cy.get('#email').type(email)
    cy.get('#password').type(senha)
    cy.get('#repeatPassword').type(senha)
    cy.get('#show-password').click()
    cy.get('#register').click()
  })
  
  it('Usuário válido', async () => {
    cy.get('#text-alert').should('contain', 'Cadastro realizado com sucesso!')
    await cy.wait(5000)

    const { emailAlreadyUsed } = await graphql_api(emailUsed(email))
    expect(emailAlreadyUsed).to.be.true
  })
  
  it('Usuário inválido', () => {
    cy.get('#text-alert').should('contain', 'Este email já está sendo usado.')
  })
})
