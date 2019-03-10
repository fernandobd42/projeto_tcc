import gql from "graphql-tag"

export const DRAFTS = gql`
  {
    drafts {
      id
      title
      content
    }
  }
`

export const POSTS = gql`
  {
    posts {
      id
      title
      content
    }
  }
`