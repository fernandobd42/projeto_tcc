import { graphql_api } from '../../../utils/graphql-request.service'

const getDraft = id => `{
  draft(id: "${id}")
}`

const email = 'fernando@gmail.com'
const password = '%fernando%123'
let titleEdited, id;

describe('Editar rascunho', () => {
  before(() => {
    cy.visit('http://localhost:3000/auth/login')
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get('#show-password').click()
    cy.get('#login').click()
    cy.wait(5000)
    cy.get('#publications').click()
    cy.wait(3000)
    cy.get('#table-row:first-child #editar-rascunho').click()
  })
  
  it('Editando rascunho', () => {
    cy.location("pathname").should("contain", "/admin/editItem")
    
    cy.get('#title').type(' editado')
    cy.get('input[name="title"]')
      .invoke('val')
      .then(text => titleEdited = text);
    cy.window()
      .then(win => id = win.location.href.split('/').pop())

    cy.get('#save-draft').click()
    cy.get('#text-alert').should('contain', 'Rascunho editado com sucesso!')
  })

  it('Validar rascunho', async () => {
    const { draft } = await graphql_api(getDraft(id))
    expect(draft).to.be.equal(titleEdited)
  })
})