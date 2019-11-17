// Dependencies
import { ApolloServer, makeExecutableSchema } from 'apollo-server'

// Models
import models from './models'

// Graphql Resolvers & Types
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/types'

// Schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// Apollo Server
const apolloServer = new ApolloServer({
  schema,
  context: {
    models
  }
})

const alter = true
const force = true

// Running Apollo Server
models.sequelize.sync({ alter, force }).then(() => {
  apolloServer.listen(5000).then(({ url }) => console.log(`Running on ${url}`))
})
