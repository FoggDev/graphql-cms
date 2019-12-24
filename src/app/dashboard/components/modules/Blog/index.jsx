// Dependencies
import React, { useContext } from 'react'
import propTypes from '@propTypes'
import { DarkButton } from 'fogg-ui'

// Contexts
import { BlogContext } from '@contexts/blog'
import FormProvider from '@contexts/form'

// Components
import Title from '@ui/Title'

// Actions
import Create from '@actions/Create'

// Schema
import schema from '@schemas/blog'

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

      <DarkButton href="/dashboard/blog/create">Create Post</DarkButton>
    </>
  )
}

Blog.propTypes = {
  action: propTypes.action,
  user: propTypes.user
}

export default Blog
