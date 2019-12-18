// Dependencies
import React, { createContext, useState } from 'react'
import propTypes from '@propTypes'
import { useApolloClient } from 'react-apollo-hooks'
import { getGraphQlError } from 'fogg-utils'

// Mutations
import CREATE_POST from '@graphql/blog/createPost.mutation'

// Queries
import GET_POSTS from '@graphql/blog/getPosts.query'

// Validations
const validations = {
  userId: {
    len: {
      arg: 36,
      msg: 'Invalid ID'
    }
  },
  title: {
    isEmpty: {
      msg: 'Title is empty'
    }
  },
  slug: {
    isEmpty: {
      msg: 'Slug is empty'
    }
  },
  content: {
    isEmpty: {
      msg: 'Content is empty'
    }
  }
}

function validate(validations, values) {
  const messages = []

  Object.keys(validations).forEach(field => {
    const { len, isEmpty } = validations[field]

    if (len && len.arg) {
      if (values[field].length !== len.arg) {
        messages.push({
          [field]: {
            msg: len.msg
          }
        })
      }
    }

    if (isEmpty) {
      if (values[field] === '') {
        messages.push({
          [field]: {
            msg: isEmpty.msg
          }
        })
      }
    }

    return messages.length > 0
      ? {
        error: true,
        messages
      }
      : {
        error: false
      }
  })
}

export const BlogContext = createContext({
  create: async () => undefined,
  getPosts: async () => undefined,
  posts: []
})

const BlogProvider = ({ children }) => {
  const { mutate, query } = useApolloClient()
  const [posts, setPosts] = useState([])

  async function create(values) {
    try {
      const messages = validate(validations, values)

      if (messages.error) {
        return messages
      }

      const { data } = await mutate({
        mutation: CREATE_POST,
        variables: values
      })

      if (data) {
        return data.createPost
      }
    } catch (err) {
      return getGraphQlError(err)
    }
  }

  async function getPosts() {
    try {
      const { data } = await query({
        query: GET_POSTS
      })

      if (data) {
        setPosts(data.getPosts)

        return data.getPosts
      }
    } catch (err) {
      return getGraphQlError(err)
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
