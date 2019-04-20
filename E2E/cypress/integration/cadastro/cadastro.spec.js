import faker from 'faker'

import { graphql_api } from '../../../utils/graphql-request.service'

const emailUsed = email => `{
  emailAlreadyUsed(email: "${email}")
}`;

describe('Cadastrar Usuário', () => {
  const name = faker.name.findName()
  const email = faker.internet.email()
  const senha = faker.internet.password(10)

  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/register')

    cy.get('#name').type(name)
    cy.get('#email').type(email)
    cy.get('#password').type(senha)
    cy.get('#repeatPassword').type(senha)
    cy.get('#show-password').click()
    cy.get('#register').click()
  })
  
  it('Usuário válido', () => {
    cy.get('#text-alert').should('contain', 'Cadastro realizado com sucesso!')
    cy.wait(5000)
  })
  
  it('Usuário inválido', async () => {
    cy.get('#text-alert').should('contain', 'Este email já está sendo usado.')
    
    const { emailAlreadyUsed } = await graphql_api(emailUsed(email))
    expect(emailAlreadyUsed).to.be.true
  })

})