import { request } from 'graphql-request'

export const graphql_api = query => request('http://localhost:4000', query).then(data => data)