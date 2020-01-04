// Dependencies
import React, { useContext } from 'react'
import propTypes from '@propTypes'

// Contexts
import FormProvider from '@contexts/form'
import { BlogContext } from '@contexts/blog'

// Actions
import Create from '@actions/Create'
import Read from '@actions/Read'

// Schema
import schema from '@schemas/blog'

const Blog = ({ action = 'read', user, id = null, page }) => {
  const { create, read } = useContext(BlogContext)
  console.log('ID', id)
  if (action === 'create') {
    return (
      <FormProvider initialValues={{ userId: user.id }}>
        <Create
          caption="Post"
          schema={schema}
          create={create}
        />
      </FormProvider>
    )
  }

  if (action === 'read') {
    return (
      <Read
        module="blog"
        caption="Posts"
        read={read}
        head={['Title', 'Reading Time', 'Language', 'Published', 'Date', 'Tags']}
        body={['title', 'readingTime', 'language', 'published', 'createdAt', 'tags.name']}
        page={page}
      />
    )
  }
}

Blog.propTypes = {
  action: propTypes.action,
  user: propTypes.user,
  id: propTypes.id,
  page: propTypes.page
}

export default Blog
