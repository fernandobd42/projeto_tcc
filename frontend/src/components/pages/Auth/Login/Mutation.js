import gql from "graphql-tag"

const LOGIN = gql`
  mutation signup($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token,
      user {
        id,
        name,
        email
      }
    }
  }
`

export default LOGIN