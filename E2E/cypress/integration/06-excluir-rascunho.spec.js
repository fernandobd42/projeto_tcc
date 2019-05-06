import faker from 'faker'

import { graphql_api } from '../../utils/graphql-request.service'

const getDraft = id => `{
  titleDraft(id: "${id}")
}`

const email = 'fernando@gmail.com'
const password = '%fernando%123'
const title = faker.lorem.words(4)
const content = faker.lorem.paragraphs(2)
let id

describe('Excluir rascunho', () => {
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
    cy.get('#title').type(title)
    cy.get('#content').type(content)
    cy.get('#save-draft').click()
    cy.wait(3000)
    
    cy.get('#table-row:first-child #editar-rascunho').click()
    cy.window()
      .then(win => id = win.location.href.split('/').pop())
    cy.wait(3000)
    cy.get('#cancel').click()
  })
  
  it('Excluindo rascunho', () => {
    cy.get('#table-row:first-child #excluir-rascunho').click()
    cy.wait(3000)
    cy.get('.confirm-button').click()
    cy.get('#text-alert').should('contain', 'Item excluído com sucesso.')
    cy.wait(3000)
  })

  it('Validar rascunho', async () => {
    const { titleDraft } = await graphql_api(getDraft(id))
    expect(titleDraft).to.be.equal('Rascunho não existe')
  })
})
