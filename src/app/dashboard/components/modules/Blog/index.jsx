// Dependencies
import React, { useContext } from 'react'
import propTypes from '@propTypes'
import { DarkButton } from 'fogg-ui'

// Components
import Title from '@ui/Title'

// Contexts
import FormProvider from '@contexts/form'
import { BlogContext } from '@contexts/blog'

// Actions
import Create from '@actions/Create'

// Schema
import schema from '@schemas/blog'

const Blog = ({ action, user }) => {
  const { create } = useContext(BlogContext)

  if (action === 'create') {
    return (
      <FormProvider initialValues={{ userId: user.id }}>
        <Create
          module="Post"
          schema={schema}
          create={create}
        />
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
