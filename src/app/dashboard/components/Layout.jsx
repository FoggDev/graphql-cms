// Dependencies
import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { getModuleInfo, isBrowser } from 'fogg-utils'

// Components
import Header from '@layouts/dashboard/Header'
import Sidebar from '@layouts/dashboard/Sidebar'
import Content from '@layouts/dashboard/Content'
import Title from '@ui/Title'

// Modules
import Home from './modules/Home'
import Blog from './modules/Blog'
import Comments from './modules/Comments'
import Users from './modules/Users'

// Configuration
import config from '@config'

// Contexts
import { UserContext } from '@contexts/user'

// Styles
import styles from './Layout.scss'

const Layout = () => {
  const router = useRouter()
  const { page = 1 } = router.query
  const { user } = useContext(UserContext)
  const { module, action, id } = getModuleInfo(router)

  const moduleProps = {
    action,
    user,
    id,
    page
  }

  if (isBrowser() && !user) {
    return null
  }

  return (
    <>
      <Title content="Dashboard" />

      <main className={styles.layout}>
        <Header appName={config.appName} />

        <div className={styles.wrapper}>
          <Sidebar module={module} />

          <Content>
            {module === 'home' && <Home {...moduleProps} />}
            {module === 'blog' && <Blog {...moduleProps} />}
            {module === 'comments' && <Comments {...moduleProps} />}
            {module === 'users' && <Users {...moduleProps} />}
          </Content>
        </div>
      </main>
    </>
  )
}

export default Layout
