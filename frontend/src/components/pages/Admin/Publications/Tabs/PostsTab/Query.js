import gql from 'graphql-tag'

const POSTS_QUERY = gql`
  {
    posts {
      id
      title
      published
    }
  }
`

export default POSTS_QUERY