// Dependencies
import { ApolloServer, makeExecutableSchema } from 'apollo-server'

// Type Definitions
const typeDefs = `
  type Hello {
    message: String!
  }

  type Query {
    sayHello(name: String!): Hello
  }
`

// Resolvers
const resolvers = {
  Query: {
    sayHello: (_, args) => {
      return {
        message: `Hello ${args.name || 'world'}`
      }
    }
  }
}

// Schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// Apollo Server
const apolloServer = new ApolloServer({
  schema
})

// Running Apollo Server
apolloServer.listen(5000).then(({ url }) => console.log(`Running on ${url}`))
