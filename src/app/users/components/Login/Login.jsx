// Dependencies
import React, { Component } from 'react'
import { func, string } from 'prop-types'
import { Alert, DarkButton, PrimaryButton, Input, RenderIf } from 'fogg-ui'
import { cx, redirectTo } from 'fogg-utils'

// Components
import Logo from '@layout/Logo'

// Context
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

  handleLogin = async (user) => {
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
    const { handleInputChanged, values } = this.context
    const { invalidLogin, errorMessage, ready } = this.state

    return (
      <>
        <RenderIf isTrue={invalidLogin}>
          <Alert danger center flat>{errorMessage}</Alert>
        </RenderIf>

        <RenderIf isTrue={ready}>
          <div className={styles.login}>
            <div className={styles.wrapper}>
              <div className={styles.form}>
                <Logo center />

                <Input
                  type="email"
                  className={styles.email}
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChanged}
                  value={values.email}
                />

                <Input
                  type="password"
                  className={styles.password}
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChanged}
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
              </div>
            </div>
          </div>
        </RenderIf>
      </>
    )
  }
}

Login.contextType = FormContext

Login.propTypes = {
  login: func,
  currentUrl: string
}

export default Login
