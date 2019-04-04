import gql from 'graphql-tag'

const UPDATE_USER = gql`
  mutation updateUser($name: String!, $email: String!, $currentEmail: String!, $password: String!) {
    updateUser(name: $name, email: $email, currentEmail: $currentEmail, password: $password) {
      id
      name,
      email
    }
  }
`

export default UPDATE_USER
