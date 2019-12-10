// Dependencies
import React, { PureComponent } from 'react'
import { Badge, Icon } from 'fogg-ui'

// Components
import Link from '@ui/Link'
import Triangle from '@ui/Triangle'

// Styles
import styles from './Sidebar.scss'

class Sidebar extends PureComponent {
  render() {
    return (
      <aside className={styles.sidebar}>
        <ul className={styles.navbar}>
          <li>
            <Link href="#">
              <Icon type="fas fa-home" />
              {' '}
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="#" className={styles.active}>
              <Icon type="fas fa-book" />
              {' '}
              Blog
            </Link>

            <Triangle />
          </li>
          <li>
            <Link href="#">
              <Icon type="fas fa-comments" />
              {' '}
              Comments

              <div className={styles.badge}>
                <Badge dark>99</Badge>
              </div>
            </Link>
          </li>
          <li>
            <Link href="#">
              <Icon type="fas fa-users" />
              {' '}
              Users
            </Link>
          </li>
          <li>
            <Link href="#">
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

export default Sidebar
