// Dependencies
import React from 'react'
import { ApolloProvider } from 'react-apollo-hooks'

// Hooks
import useApolloClient from '@apollo-client'

// Component
import DashboardLayout from '@app/dashboard/components/Layout'

// Context
import UserProvider from '@contexts/user'

const Dashboard = props => {
  return (
    <ApolloProvider client={useApolloClient()}>
      <UserProvider>
        <DashboardLayout {...props} />
      </UserProvider>
    </ApolloProvider>
  )
}

export default Dashboard
