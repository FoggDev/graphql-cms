import { isFunction } from 'fogg-utils'
import post from '../post'

describe('#Query', () => {
  it('should have getPosts method', async () => {
    expect(isFunction(post.Query.getPosts)).toBe(true)
  })
})

describe('#Mutation', () => {
  it('should have createPost method', async () => {
    expect(isFunction(post.Mutation.createPost)).toBe(true)
  })
})
