// Dependencies
import React from 'react'
import propTypes from '@propTypes'

// Components
import Title from '@ui/Title'

const Comments = ({ action, user }) => {
  console.log(action, user)

  return (
    <>
      <Title content="Comments - Dashboard" />

      <h1>Comments Module</h1>
    </>
  )
}

Comments.propTypes = {
  action: propTypes.action,
  user: propTypes.user
}

export default Comments
