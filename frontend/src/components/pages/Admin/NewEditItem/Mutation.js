import gql from 'graphql-tag'

const CREATE_DRAFT = gql`
  mutation createDraft($title: String!, $content: String!) {
    createDraft(title: $title, content: $content) {
      id
    }
  }
`

export default CREATE_DRAFT
