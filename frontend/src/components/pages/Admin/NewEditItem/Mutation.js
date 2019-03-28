import gql from 'graphql-tag'

export const CREATE_DRAFT = gql`
  mutation createDraft($title: String!, $content: String!) {
    createDraft(title: $title, content: $content) {
      id
    }
  }
`

export const UPDATE_ITEM = gql`
  mutation updatePost($id: String!, $title: String!, $content: String!) {
    updatePost(id: $id, title: $title, content: $content) {
      id
    }
  }
`
