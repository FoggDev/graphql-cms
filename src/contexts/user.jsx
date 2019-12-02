// Dependencies
import React, { createContext, useState } from 'react'
import { element } from 'prop-types'
import { useApolloClient } from 'react-apollo-hooks'
import { useCookies } from 'react-cookie'
import { getGraphQlError } from 'fogg-utils'

// Queries
import LOGIN_MUTATION from '@graphql/user/login.mutation'

export const UserContext = createContext({
  login: async () => undefined,
  user: {}
})

const UserProvider = ({ children }) => {
  const { mutate } = useApolloClient()
  const [, setCookie] = useCookies(['user'])
  const [user, setUser] = useState([])

  async function login({ email, password }) {
    try {
      const { data } = await mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          email,
          password
        }
      })

      if (data) {
        setCookie('at', data.login.token, { path: '/' })
        setUser(data.login.token)

        return data.login.token
      }

      return null
    } catch (err) {
      return getGraphQlError(err)
    }
  }

  const context = {
    login,
    user
  }

  return (
    <UserContext.Provider value={context}>
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: element
}

export default UserProvider
