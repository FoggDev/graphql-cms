import path from 'path'
import { fileLoader, mergeResolvers } from 'merge-graphql-schemas'

const typesArray = fileLoader(path.join(__dirname, './'))

export default mergeResolvers(typesArray, { all: true })
