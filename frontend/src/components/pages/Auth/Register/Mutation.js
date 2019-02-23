import gql from "graphql-tag"

const SIGN_UP = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      user {
        name,
        email
      }
    }
  }
`

export default SIGN_UP