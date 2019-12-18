// Dependencies
import React, { useContext } from 'react'
import propTypes from '@propTypes'
import { slugFn } from 'fogg-utils'

// Contexts
import { BlogContext } from '@contexts/blog'
import FormProvider from '@contexts/form'

// Components
import Title from '@ui/Title'

// Actions
import Create from '@actions/Create'

const schema = {
  title: {
    type: 'input',
    required: true,
    slug: {
      field: 'slug',
      fn: slugFn
    }
  },
  content: {
    type: 'textarea',
    required: true
  },
  userId: {
    type: 'hidden',
    required: true
  },
  tags: {
    type: 'input'
  }
}

const Blog = ({ action, user }) => {
  const {
    create
  } = useContext(BlogContext)

  if (action === 'create') {
    return (
      <FormProvider initialValues={{ userId: user.id }}>
        <Create module="Post" create={create} schema={schema} />
      </FormProvider>
    )
  }

  return (
    <>
      <Title content="Blog - Dashboard" />

      <h1>Blog Module</h1>
    </>
  )
}

Blog.propTypes = {
  action: propTypes.action,
  user: propTypes.user
}

export default Blog
