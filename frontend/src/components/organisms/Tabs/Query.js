import gql from 'graphql-tag'

export const DRAFTS_QUERY = gql`
  {
    drafts {
      id
      title
      published
    }
  }
`

export const POSTS_QUERY = gql`
  {
    posts {
      id
      title
      published
    }
  }
`