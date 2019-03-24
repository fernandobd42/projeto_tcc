import gql from 'graphql-tag'

export const PUBLISH = gql`
  mutation publish($id: ID!) {
    publish(id: $id) {
      id
      title
    }
  }
`

export const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`
