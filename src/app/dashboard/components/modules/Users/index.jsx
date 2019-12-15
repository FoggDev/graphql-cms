// Dependencies
import React from 'react'
import propTypes from '@propTypes'

// Components
import Title from '@ui/Title'

const Users = ({ action, user }) => {
  console.log(action, user)

  return (
    <>
      <Title content="Users - Dashboard" />

      <h1>Users Module</h1>
    </>
  )
}

Users.propTypes = {
  action: propTypes.action,
  user: propTypes.user
}

export default Users
