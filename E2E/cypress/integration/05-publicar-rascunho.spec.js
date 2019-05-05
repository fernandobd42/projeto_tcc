import { graphql_api } from '../../utils/graphql-request.service'

const getPost = id => `{
  post(id: "${id}") {
    published
  }
}`

const email = 'fernando@gmail.com'
const password = '%fernando%123'
let id

describe('Publicar rascunho', () => {
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
    cy.window()
      .then(win => id = win.location.href.split('/').pop())
    cy.wait(3000)
    cy.get('#cancel').click()
  })
  
  it('Publicando rascunho', () => {
    cy.get('#table-row:first-child #publicar-rascunho').click()
    cy.wait(3000)
    cy.get('.confirm-button').click()
    cy.get('#text-alert').should('contain', 'Rascunho publicado com sucesso.')
    cy.wait(3000)
  })

  it('Validar publicação', async () => {
    const { post } = await graphql_api(getPost(id))
    expect(post.published).to.be.true
  })
})
