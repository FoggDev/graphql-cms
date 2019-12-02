// Dependencies
import { isBrowser } from 'fogg-utils'
import { string } from 'prop-types'
import { ApolloProvider } from 'react-apollo-hooks'

// Hooks
import useApolloClient from '@apollo-client'

// Context
import FormProvider from '@contexts/form'
import UserProvider from '@contexts/user'

// Components
import LoginLayout from '@users/components/Login/Layout'

const LoginPage = ({
  currentUrl = isBrowser() ? window.location.search.replace('?redirectTo=', '') : ''
}) => (
  <ApolloProvider client={useApolloClient()}>
    <UserProvider>
      <FormProvider initialValues={{ email: '', password: '' }}>
        <LoginLayout currentUrl={currentUrl} />
      </FormProvider>
    </UserProvider>
  </ApolloProvider>
)

LoginPage.propTypes = {
  currentUrl: string
}

export default LoginPage
