// Dependencies
import React, { PureComponent } from 'react'
import propTypes from '@propTypes'
import { Badge, Icon, RenderIf } from 'fogg-ui'

// Components
import Link from '@ui/Link'
import Triangle from '@ui/Triangle'

// Styles
import styles from './Sidebar.scss'

class Sidebar extends PureComponent {
  render() {
    const { module } = this.props

    return (
      <aside className={styles.sidebar}>
        <ul className={styles.navbar}>
          <li>
            <Link href="/dashboard" className={module === 'home' && styles.active}>
              <Icon type="fas fa-home" />
              {' '}
              Dashboard
            </Link>

            <RenderIf isTrue={module === 'home'}>
              <Triangle />
            </RenderIf>
          </li>
          <li>
            <Link href="/dashboard/blog" className={module === 'blog' && styles.active}>
              <Icon type="fas fa-book" />
              {' '}
              Blog
            </Link>

            <RenderIf isTrue={module === 'blog'}>
              <Triangle />
            </RenderIf>
          </li>
          <li>
            <Link href="/dashboard/comments" className={module === 'comments' && styles.active}>
              <Icon type="fas fa-comments" />
              {' '}
              Comments

              <div className={styles.badge}>
                <Badge dark>99</Badge>
              </div>
            </Link>

            <RenderIf isTrue={module === 'comments'}>
              <Triangle />
            </RenderIf>
          </li>
          <li>
            <Link href="/dashboard/users" className={module === 'users' && styles.active}>
              <Icon type="fas fa-users" />
              {' '}
              Users
            </Link>

            <RenderIf isTrue={module === 'users'}>
              <Triangle />
            </RenderIf>
          </li>
          <li>
            <Link href="/logout">
              <Icon type="fas fa-power-off" />
              {' '}
              Logout
            </Link>
          </li>
        </ul>
      </aside>
    )
  }
}

Sidebar.propTypes = {
  module: propTypes.module.isRequired
}

export default Sidebar
