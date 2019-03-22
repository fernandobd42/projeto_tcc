import gql from 'graphql-tag'

const PUBLISH = gql`
  mutation publish($id: ID!) {
    publish(id: $id) {
      id
      title
    }
  }
`

export default PUBLISH