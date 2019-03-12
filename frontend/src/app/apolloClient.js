import ApolloClient from 'apollo-boost'
import { getToken } from 'app/store'

const GRAPHQL_URL = 'http://localhost:4000'
const MIDDLEWARE = async operation => {
  const token = getToken()
  
  if (!!token) {
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  }
}

const apolloClient = new ApolloClient({
  uri: GRAPHQL_URL,
  request: MIDDLEWARE
})

export default apolloClient