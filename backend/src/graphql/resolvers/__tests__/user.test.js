import { isFunction } from 'fogg-utils'
import user from '../user'

describe('#Query', () => {
  it('should have getPosts method', async () => {
    expect(isFunction(user.Query.getUsers)).toBe(true)
  })
})

describe('#Mutation', () => {
  it('should have createUser method', async () => {
    expect(isFunction(user.Mutation.createUser)).toBe(true)
  })

  it('should have login method', async () => {
    expect(isFunction(user.Mutation.login)).toBe(true)
  })
})
