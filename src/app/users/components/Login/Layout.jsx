// Dependencies
import React from 'react'
import { string } from 'prop-types'
import Head from 'next/head'

// Context
import { UserContext } from '@contexts/user'

// Components
import Login from './Login'

// Styles
import styles from './Layout.scss'

const Layout = ({ currentUrl }) => (
  <>
    <Head>
      <title>Login</title>
      <meta name="title" content="Login" />
    </Head>

    <UserContext.Consumer>
      {({ login }) => (
        <Login login={login} currentUrl={currentUrl} />
      )}
    </UserContext.Consumer>
  </>
)

Layout.propTypes = {
  currentUrl: string
}

export default Layout
