import gql from "graphql-tag"

const USER = gql`
  {
    me {
      id,
      name,
      email
    }
  }
`
export default USER