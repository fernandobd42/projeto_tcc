import faker from 'faker'

import { graphql_api } from '../../../utils/graphql-request.service'

const entrar = (email, password) => `{
  token(email: "${email}", password: "${password}")
}`;

const email = 'fernando@gmail.com'
const emailInvalido = faker.internet.email()
const senha = '%fernando%123'
const senhaInvalida = faker.internet.password(10)

describe('Entrar com Usuário', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/login')
  })
  
  it('Usuário válido', () => {
    cy.get('#email').type(email)
    cy.get('#password').type(senha)
    cy.get('#show-password').click()
    cy.get('#entrar').click()

    cy.get('#text-alert').should('contain', 'Login realizado com sucesso!')
    cy.location("pathname").should("eq", "/admin/feed");
    cy.wait(5000)
  
    graphql_api(entrar(email, senha)).then(({ token }) => {
      expect(!!token).to.have.true
      expect(token.length).to.be.greaterThan(154)
    })
  })
  
  it('Usuário inválido', () => {
    cy.get('#email').type(emailInvalido)
    cy.get('#password').type(senhaInvalida)
    cy.get('#show-password').click()
    cy.get('#entrar').click()

    cy.get('#text-alert').should('contain', 'Email não cadastrado!')
    cy.wait(5000)

    cy.get('#email').clear()
    cy.get('#email').type(email)
    cy.get('#entrar').click()

    cy.get('#text-alert').should('contain', 'Senha incorreta, tente novamente com outra senha.')
    cy.wait(5000)
  })
})
