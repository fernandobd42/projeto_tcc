import faker from 'faker'

import { graphql_api } from '../../../utils/graphql-request.service'

const titleAlreadyExists = title => `{
  titleExists(title: "${title}")
}`

const email = 'fernando@gmail.com'
const password = '%fernando%123'
const title = faker.lorem.words(4)
const content = faker.lorem.paragraphs(3)

describe('Cadastrar rascunho', () => {
  before(() => {
    cy.visit('http://localhost:3000/auth/login')
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get('#show-password').click()
    cy.get('#login').click()
    cy.wait(5000)
    cy.get('#publications').click()
    cy.wait(3000)
    cy.get('#new-draft').click()
  })
  
  it('Novo rascunho', () => {
    cy.location("pathname").should("eq", "/admin/newDraft")
    
    cy.get('#title').type(title)
    cy.get('#content').type(content)
    cy.get('#save-draft').click()
    
    cy.get('#text-alert').should('contain', 'Rascunho adicionado com sucesso!')
  })

  it('Validar rascunho', async () => {
    const { titleExists } = await graphql_api(titleAlreadyExists(title))
    expect(titleExists).to.be.true
  })
})