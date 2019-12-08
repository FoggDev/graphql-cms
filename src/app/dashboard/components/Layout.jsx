// Dependencies
import React from 'react'
import Head from 'next/head'

// Components
import Header from '@dashboard/Header'
import Sidebar from '@dashboard/Sidebar'
import Content from '@dashboard/Content'

// Styles
import styles from './Layout.scss'

const Layout = () => (
  <>
    <Head>
      <title>Dashboard</title>
    </Head>

    <main>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <Content>
          <>
            <h2>Home</h2>
          </>
        </Content>
      </div>
    </main>
  </>
)

export default Layout
