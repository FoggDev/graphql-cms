// Dependencies
import Head from 'next/head'
import { string } from 'prop-types'

// Components
import LoginLayout from '../../app/users/components/Login/Layout'

const Login = () => (
  <>
    <Head>
      <title>Login</title>
      <meta name="title" content="Login" />
    </Head>

    <LoginLayout />
  </>
)

export default Login
