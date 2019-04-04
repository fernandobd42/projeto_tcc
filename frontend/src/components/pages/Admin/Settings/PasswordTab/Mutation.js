import gql from 'graphql-tag'

const UPDATE_PASSWORD = gql`
  mutation updatePassword($currentEmail: String!, $currentPassword: String!, $newPassword: String!, ) {
    updatePassword(currentEmail: $currentEmail, currentPassword: $currentPassword, newPassword: $newPassword,) {
      id
    }
  }
`

export default UPDATE_PASSWORD
