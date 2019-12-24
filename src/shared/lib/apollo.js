// Dependencies
import fetch from 'node-fetch'
import { ApolloClient } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { ErrorLink } from 'apollo-link-error'

// Configuration
import config from '@config'

export default () => {
  const httpLink = new HttpLink({
    uri: config.api.uri,
    credentials: config.api.credentials,
    fetch
  })

  const errorLink = new ErrorLink(error => {
    console.error('GraphQL Error:', error)
  })

  const cache = new InMemoryCache({
    dataIdFromObject: object => object.id || null,
    addTypename: false
  })

  const client = new ApolloClient({
    connectToDevTools: true,
    link: ApolloLink.from([errorLink, httpLink]),
    cache
  })

  return client
}
