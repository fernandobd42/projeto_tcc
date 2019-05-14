import { graphql_api } from '../../utils/graphql-request.service'

const getDraft = id => `{
  titleDraft(id: "${id}")
}`

let titleEdited, id

describe('Editar rascunho', () => {
  before(() => {
    cy.login()
    cy.get('#publications').click()
    cy.wait(3000)
    cy.get('#table-row:first-child #editar-rascunho').click()
  })
  
  it('Editando rascunho', () => {
    cy.location("pathname").should("contain", "/admin/editItem")
    
    cy.get('#title').type(' editado')
    cy.get('input[name="title"]')
      .invoke('val')
      .then(text => titleEdited = text)
    cy.window()
      .then(win => id = win.location.href.split('/').pop())

    cy.get('#save-draft').click()
    cy.get('#text-alert').should('contain', 'Rascunho editado com sucesso!')
    cy.wait(3000)
  })

  it('Validar rascunho', async () => {
    const { titleDraft } = await graphql_api(getDraft(id))
    expect(titleDraft).to.be.equal(titleEdited)
  })
})
