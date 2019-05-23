import faker from 'faker'

import { graphql_api } from '../../utils/graphql-request.service'
import { email, password} from './../../utils/user-constants'

const getToken = (email, password) => `{
  token(email: "${email}", password: "${password}")
}`

const emailInvalid = faker.internet.email()
const passwordInvalid = faker.internet.password(10)

describe('Entrar com Usuário', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/login')
  })
  
  it('Usuário válido', () => {
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get('#show-password').click()
    cy.get('#login').click()

    cy.get('#text-alert').should('contain', 'Login realizado com sucesso!')
    cy.location("pathname").should("eq", "/admin/feed")
    cy.wait(5000)
  })

  it('Validar usuário', async () => {
    const { token } = await graphql_api(getToken(email, password))
    expect(!!token).to.have.true
    expect(token.length).to.be.greaterThan(154)
  })
  
  it('Usuário inválido', () => {
    cy.get('#email').type(emailInvalid)
    cy.get('#password').type(passwordInvalid)
    cy.get('#show-password').click()
    cy.get('#login').click()

    cy.get('#text-alert').should('contain', 'Email não cadastrado!')
    cy.wait(5000)

    cy.get('#email').clear()
    cy.get('#email').type(email)
    cy.get('#login').click()

    cy.get('#text-alert').should('contain', 'Senha incorreta, tente novamente com outra senha.')
    cy.wait(5000)
  })
})
