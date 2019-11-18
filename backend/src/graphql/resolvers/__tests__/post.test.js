import post from '../post'
import { isFunction } from '../../../utils/is'

describe('#Query', () => {
  it('should have getPosts', async () => {
    expect(isFunction(post.Query.getPosts)).toBe(true)
  })
})

describe('#Mutation', () => {
  it('should have createPost', async () => {
    expect(isFunction(post.Mutation.createPost)).toBe(true)
  })
})
