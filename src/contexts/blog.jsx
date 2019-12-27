// Dependencies
import React, { createContext } from 'react'
import propTypes from '@propTypes'
import { useApolloClient } from 'react-apollo-hooks'

// Mutations
import CREATE_POST from '@graphql/blog/createPost.mutation'

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
  content: {
    isEmpty: {
      msg: 'Content is empty'
    }
  }
}

function validate(validations, values) {
  const messages = {}

  Object.keys(validations).forEach(field => {
    const { len, isEmpty } = validations[field]

    if (len && len.arg) {
      if (values[field].length !== len.arg) {
        messages[field] = {
          msg: len.msg
        }
      }
    }

    if (isEmpty) {
      if (values[field] === '' || !values[field]) {
        messages[field] = {
          msg: isEmpty.msg
        }
      }
    }
  })

  return Object.keys(messages).length > 0
    ? {
      error: true,
      alert: 'Error trying to create post',
      messages
    }
    : {
      error: false
    }
}

export const BlogContext = createContext({
  create: async () => undefined
})

const BlogProvider = ({ children }) => {
  const { mutate } = useApolloClient()

  async function create(values) {
    let messages = validate(validations, values)

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

  const context = {
    create
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
