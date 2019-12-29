// Dependencies
import React, { createContext, useState } from 'react'
import propTypes from '@propTypes'
import { useApolloClient } from 'react-apollo-hooks'
import { validateFields } from 'fogg-utils'

// Mutations
import CREATE_POST from '@graphql/blog/createPost.mutation'

// Queries
import GET_POSTS from '@graphql/blog/getPosts.query'
import GET_POSTS_COUNT from '@graphql/blog/getPostsCount.query'

// Validations
import validations from '@validations/blog'

export const BlogContext = createContext({
  create: async () => undefined,
  getPosts: async () => undefined,
  posts: []
})

const BlogProvider = ({ children }) => {
  const { mutate, query } = useApolloClient()
  const [posts, setPosts] = useState([])

  async function create(values) {
    let messages = validateFields(validations, values, 'Error trying to create the post')

    if (messages.error) {
      return messages
    }

    const { errors, data } = await mutate({
      mutation: CREATE_POST,
      variables: values,
      errorPolicy: 'all'
    })

    if (errors && errors.length > 0) {
      const [{ extensions: { exception } }] = errors

      if (exception.name === 'SequelizeUniqueConstraintError') {
        messages = {
          error: true,
          alert: `The post with title "${values.title}" already exists`,
          messages: {
            title: {
              msg: 'Change the title'
            }
          }
        }
      }
    }

    if (messages.error) {
      return messages
    }

    if (data) {
      return data.createPost
    }
  }

  async function getPosts() {
    const { data: count } = await query({
      query: GET_POSTS_COUNT,
    })

    const { data } = await query({
      query: GET_POSTS,
      variables: {
        orderBy: 'createdAt',
        direction: 'DESC',
        limit: 10,
        offset: 0
      }
    })

    if (count && data) {
      setPosts(data.getPosts)

      return {
        count: count.getPostsCount.count,
        data: data.getPosts
      }
    }
  }

  const context = {
    create,
    getPosts,
    posts
  }

  return (
    <BlogContext.Provider value={context}>
      {children}
    </BlogContext.Provider>
  )
}

BlogProvider.propTypes = {
  children: propTypes.children.isRequired
}

export default BlogProvider
