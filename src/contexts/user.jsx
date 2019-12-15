// Dependencies
import React, { createContext, useState } from 'react'
import propTypes from '@propTypes'
import { useApolloClient } from 'react-apollo-hooks'
import { useCookies } from 'react-cookie'
import { getGraphQlError } from 'fogg-utils'
import { getUserData } from '@lib/jwt'

// Mutations
import LOGIN_MUTATION from '@graphql/user/login.mutation'

export const UserContext = createContext({
  getUser: () => undefined,
  login: async () => undefined,
  user: {}
})

const UserProvider = ({ children }) => {
  const { mutate } = useApolloClient()
  const [, setCookie] = useCookies()
  const [user, setUser] = useState()

  // Fetching user
  getUser()

  async function getUser() {
    const [cookies] = useCookies()

    const userData = await getUserData(cookies)

    if (!user) {
      setUser(userData)
    }

    return userData
  }

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
    } catch (err) {
      return getGraphQlError(err)
    }
  }

  const context = {
    getUser,
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
  children: propTypes.children
}

export default UserProvider
