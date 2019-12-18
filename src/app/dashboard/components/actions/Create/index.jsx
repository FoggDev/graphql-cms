// Dependencies
import React, { Component } from 'react'
import { Alert, DarkButton, Input, TextArea, RenderIf } from 'fogg-ui'
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

  handleCreate = async values => {
    const { create } = this.props
    const { clearValues } = this.context

    const response = await create(values)

    if (response.error) {
      this.setState({
        errorMessage: response.message,
        successMessage: ''
      })
    } else {
      clearValues(['description', 'points'])

      this.setState({
        successMessage: 'Created successfuly',
        errorMessage: ''
      })
    }
  }

  renderForm = (schema) => {
    const { handleInputChange, values } = this.context
    const url = `${location.protocol}//${location.hostname}${location.port ? `:${location.port}` : ''}`

    return Object.keys(schema).map(field => {
      const { type, slug } = schema[field]

      if (type === 'input') {
        return (
          <div className={styles.inputBlock}>
            <p>
              <label className={styles.label}>{field}</label>
            </p>

            <Input
              key={field}
              autoComplete="off"
              name={field}
              onChange={handleInputChange}
              value={values[field]}
              placeholder={`Add ${field} here`}
              style={{
                width: '75%'
              }}
            />

            {slug && (
              <div className={styles.slug}>
                {url}/blog/<span>{slug.fn(values[field])}</span>

                <Input
                  key={slug.field}
                  autoComplete="off"
                  type="hidden"
                  name={slug.field}
                  value={slug.fn(values[field])}
                />
              </div>
            )}
          </div>
        )
      }

      if (type === 'textarea') {
        return (
          <div className={styles.textAreaBlock}>
            <p>
              <label className={styles.label}>{field}</label>
            </p>

            <TextArea
              key={field}
              name={field}
              onChange={handleInputChange}
              value={values[field]}
              placeholder={`Add ${field} here`}
              style={{
                width: '75%'
              }}
            />
          </div>
        )
      }

      return null
    })
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
          <Alert danger center flat>{errorMessage}</Alert>
        </RenderIf>

        <RenderIf isTrue={successMessage}>
          <Alert success center flat>{successMessage}</Alert>
        </RenderIf>

        <form>
          {this.renderForm(schema)}

          <DarkButton onClick={() => this.handleCreate(values)}>Save</DarkButton>
        </form>
      </div>
    )
  }
}

Create.contextType = FormContext

Create.propTypes = {
  create: propTypes.create
}

export default Create
