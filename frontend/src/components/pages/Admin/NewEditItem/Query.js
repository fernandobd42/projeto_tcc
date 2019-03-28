import gql from 'graphql-tag'

const GET_ONE_ITEM = gql`
  query post($id: ID!) {
    post(id: $id) {
      id
      title
      content
    }
  }
`

export default GET_ONE_ITEM

