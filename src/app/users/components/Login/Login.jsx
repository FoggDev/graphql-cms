// Dependencies
import React, { useContext, useState, useEffect } from 'react'
import { Alert, DarkButton, PrimaryButton, Input, RenderIf } from 'fogg-ui'
import propTypes from '@propTypes'
import { cx, redirectTo } from 'fogg-utils'

// Components
import Logo from '@layouts/main/Logo'

// Contexts
import { FormContext } from '@contexts/form'

// Styles
import styles from './Login.scss'

const Login = ({ login, currentUrl }) => {
  // States
  const [ready, setReady] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [invalidLogin, setInvalidLogin] = useState(false)

  // Context
  const { handleInputChange, values } = useContext(FormContext)

  // Methods
  const handleLogin = async user => {
    const response = await login(user)

    if (response.error) {
      setInvalidLogin(true)
      setErrorMessage(response.message)
    } else {
      redirectTo(currentUrl || '/')
    }
  }

  // Effects
  useEffect(() => {
    if (!ready) {
      setReady(true)
    }
  }, [ready])

  // Render
  return (
    <>
      <RenderIf isTrue={invalidLogin}>
        <Alert danger center flat>{errorMessage}</Alert>
      </RenderIf>

      <div className={styles.login}>
        <div className={cx(styles.wrapper, ready ? styles.ready : '')}>
          <div className={styles.form}>
            <div className={styles.logo}>
              <Logo center />
            </div>

            <Input
              autoComplete="off"
              type="email"
              className={styles.email}
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              value={values.email}
            />

            <Input
              autoComplete="off"
              type="password"
              className={styles.password}
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              value={values.password}
            />

            <div className={styles.actions}>
              <div className={styles.left}>
                <DarkButton
                  name="login"
                  onClick={() => handleLogin(values)}
                >
                  Login
                </DarkButton>
                &nbsp;
                <PrimaryButton name="register">
                  Register
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Login.propTypes = {
  login: propTypes.login,
  currentUrl: propTypes.currentUrl
}

export default Login
