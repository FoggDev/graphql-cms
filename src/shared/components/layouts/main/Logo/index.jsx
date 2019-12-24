// Dependencies
import React from 'react'
import propTypes from '@propTypes'
import { Retina } from 'fogg-ui'

// Components
import Link from '@ui/Link'

// Styles
import styles from './Logo.scss'

const Logo = props => {
  const { isotype = '', center = '' } = props

  return (
    <div className={`${styles.logo} ${center && styles.center} ${isotype && styles.isotype}`}>
      <Link href="/" title="Codejobs">
        <Retina src="/images/logo.png" />

        {!isotype && (
          <span className={styles.brand}>
            <span className={styles.code}>CODE</span>
            <span className={styles.jobs}>JOBS</span>
          </span>
        )}
      </Link>
    </div>
  )
}

Logo.propTypes = {
  center: propTypes.center,
  isotype: propTypes.isotype
}

export default Logo
