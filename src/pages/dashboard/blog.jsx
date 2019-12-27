// Dependencies
import React from 'react'
import { ApolloProvider } from 'react-apollo-hooks'

// Hooks
import useApolloClient from '@apollo-client'

// Component
import DashboardLayout from '@app/dashboard/components/Layout'

// Context
import BlogProvider from '@contexts/blog'
import UserProvider from '@contexts/user'

const Dashboard = props => {
  return (
    <ApolloProvider client={useApolloClient()}>
      <UserProvider>
        <BlogProvider>
          <DashboardLayout {...props} />
        </BlogProvider>
      </UserProvider>
    </ApolloProvider>
  )
}

export default Dashboard
