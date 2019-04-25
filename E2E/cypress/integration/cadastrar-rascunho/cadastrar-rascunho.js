import faker from 'faker'

import { graphql_api } from '../../../utils/graphql-request.service'

const rascunhoAdicionado = title => `{
  titleExists(title: "${title}")
}`

const email = 'fernando@gmail.com'
const senha = '%fernando%123'
const title = faker.lorem.words(4)
const content = faker.lorem.paragraphs(3)

describe('Cadastrar rascunho', () => {
  before(() => {
    cy.visit('http://localhost:3000/auth/login')
    cy.get('#email').type(email)
    cy.get('#password').type(senha)
    cy.get('#show-password').click()
    cy.get('#entrar').click()
    cy.wait(5000)
    cy.get('#publicacoes').click()
    cy.wait(3000)
    cy.get('#novo-rascunho').click()
  })
  
  it('Novo rascunho', () => {
    cy.location("pathname").should("eq", "/admin/newDraft")
    
    cy.get('#title').type(title)
    cy.get('#content').type(content)
    cy.get('#salvar').click()
    
    cy.get('#text-alert').should('contain', 'Rascunho adicionado com sucesso!')
  })

  it('Validar rascunho', async () => {
    const { titleExists } = await graphql_api(rascunhoAdicionado(title))
    expect(titleExists).to.be.true
  })
})