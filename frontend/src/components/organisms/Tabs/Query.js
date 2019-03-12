import gql from 'graphql-tag'

export const DRAFTS = gql`
  {
    drafts {
      id
      title
      published
    }
  }
`

export const POSTS = gql`
  {
    posts {
      id
      title
      published
    }
  }
`