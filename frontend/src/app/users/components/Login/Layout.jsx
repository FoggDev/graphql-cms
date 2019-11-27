// Dependencies
import React from 'react'
import Head from 'next/head'

// Components
import Login from './Login'

// Styles
import styles from './Layout.scss'

const Layout = () => (
  <>
    <Head>
      <title>Login</title>
      <meta name="title" content="Login" />
    </Head>

    <Login />
  </>
)

export default Layout
