import gql from 'graphql-tag'

const DRAFTS_QUERY = gql`
  {
    drafts {
      id
      title
      published
    }
  }
`

export default DRAFTS_QUERY