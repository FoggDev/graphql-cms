// Dependencies
import React, { PureComponent } from 'react'
import propTypes from '@propTypes'

// Styles
import styles from './Header.scss'

class Header extends PureComponent {
  render() {
    const { appName } = this.props

    return (
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <h1>{appName}</h1>
          </div>

          <div className={styles.userProfile}>
            <div className={styles.avatar}>
              <img src="/images/avatar.jpg" alt="Carlos Santana" />
            </div>

            <div className={styles.name}>
              Carlos Santana
            </div>
          </div>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  appName: propTypes.appName.isRequired
}

export default Header
