// Dependencies
import React, { Component } from 'react'
import { Alert, PrimaryButton, RenderIf } from 'fogg-ui'
import propTypes from '@propTypes'

// Contexts
import { FormContext } from '@contexts/form'

// Styles
import styles from './Create.scss'

class Create extends Component {
  state = {
    errorMessage: '',
    successMessage: ''
  }

  handleCreate = async () => {
    // TODO: Creating new post
  }

  renderFields = () => {
    // TODO: Render form elements based on schema
  }

  render() {
    const { values } = this.context
    const { module, schema = false } = this.props
    const { errorMessage, successMessage } = this.state

    if (!schema) {
      return <p>You need to define a schema</p>
    }

    return (
      <div className={styles.create}>
        <h1>Create {module}</h1>

        <RenderIf isTrue={errorMessage}>
          <Alert danger center flat style={{ display: 'inline-block' }}>
            {errorMessage}
          </Alert>
        </RenderIf>

        <RenderIf isTrue={successMessage}>
          <Alert success center flat style={{ display: 'inline-block' }}>
            {successMessage}
          </Alert>
        </RenderIf>

        <form>
          {this.renderFields(schema)}

          <PrimaryButton
            onClick={() => this.handleCreate(values)}
          >
            Save
          </PrimaryButton>
        </form>
      </div>
    )
  }
}

Create.contextType = FormContext

Create.propTypes = {
  module: propTypes.module,
  schema: propTypes.schema
}

export default Create
