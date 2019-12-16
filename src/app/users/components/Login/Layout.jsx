// Dependencies
import React, { useContext } from 'react'
import propTypes from '@propTypes'

// Contexts
import { UserContext } from '@contexts/user'

// Components
import Title from '@ui/Title'
import Login from './Login'

const Layout = ({ currentUrl }) => {
  const { login } = useContext(UserContext)

  return (
    <>
      <Title content="Login" />
      <Login login={login} currentUrl={currentUrl} />
    </>
  )
}

Layout.propTypes = {
  currentUrl: propTypes.currentUrl
}

export default Layout
