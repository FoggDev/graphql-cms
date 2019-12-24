// Dependencies
import React, { Component } from 'react'
import { Alert, DarkButton, PrimaryButton, Input, RenderIf } from 'fogg-ui'
import propTypes from '@propTypes'
import { cx, redirectTo } from 'fogg-utils'

// Components
import Logo from '@layouts/main/Logo'

// Contexts
import { FormContext } from '@contexts/form'

// Styles
import styles from './Login.scss'

class Login extends Component {
  state = {
    ready: false,
    errorMessage: '',
    invalidLogin: false
  }

  componentDidMount() {
    this.setState({
      ready: true
    })
  }

  handleLogin = async user => {
    const { login, currentUrl } = this.props

    const response = await login(user)

    if (response.error) {
      this.setState({
        invalidLogin: true,
        errorMessage: response.message
      })
    } else {
      redirectTo(currentUrl || '/')
    }
  }

  render() {
    const { ready, errorMessage, invalidLogin } = this.state
    const { handleInputChange, values } = this.context

    return (
      <>
        <RenderIf isTrue={invalidLogin}>
          <Alert danger center flat>{errorMessage}</Alert>
        </RenderIf>

        <div className={cx(styles.login)}>
          <div className={cx(styles.wrapper, ready ? styles.ready : '')}>
            <form className={styles.form}>
              <Logo center />

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
                    onClick={() => this.handleLogin(values)}
                  >
                    Login
                  </DarkButton>
                  &nbsp;
                  <PrimaryButton name="register">
                    Register
                  </PrimaryButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}

Login.contextType = FormContext

Login.propTypes = {
  login: propTypes.login,
  currentUrl: propTypes.currentUrl
}

export default Login
