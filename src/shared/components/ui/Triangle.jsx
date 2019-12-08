// Dependencies
import React, { PureComponent } from 'react'

// Styles
import styles from './Triangle.scss'

class Triangle extends PureComponent {
  render() {
    return (
      <div className={styles.triangle}>
        <div className={styles.inner} />
      </div>
    )
  }
}

export default Triangle
