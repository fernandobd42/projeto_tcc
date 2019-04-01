import gql from 'graphql-tag'

const ALL_POSTS_QUERY = gql`
  {
    allPosts {
      id
      title
      content
      updatedAt
    }
  }
`

export default ALL_POSTS_QUERY