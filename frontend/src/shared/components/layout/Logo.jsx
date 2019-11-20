// Dependencies
import React from 'react'
import { bool } from 'prop-types'
import { Retina } from 'fogg-ui'

// Components
import Link from 'next/link'

// Styles
import styles from './Logo.scss'

const Logo = props => {
  const { isotype = '', center = '' } = props;

  return (
    <div className={`${styles.logo} ${center && styles.center} ${isotype && styles.isotype}`}>
      <Link href="/" title="Codejobs">
        <a>
          <Retina src="/images/logo.png" />

          {!isotype && (
            <span className={styles.brand}>
              <span className={styles.code}>CODE</span>
              <span className={styles.jobs}>JOBS</span>
            </span>
          )}
        </a>
      </Link>
    </div>
  );
};

Logo.propTypes = {
  center: bool,
  isotype: bool
}

export default Logo
