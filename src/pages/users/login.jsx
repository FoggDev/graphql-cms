// Dependencies
import { ApolloProvider } from 'react-apollo-hooks'
import propTypes from '@propTypes'
import { isBrowser } from 'fogg-utils'

// Hooks
import useApolloClient from '@apollo-client'

// Contexts
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
  currentUrl: propTypes.currentUrl
}

export default LoginPage
