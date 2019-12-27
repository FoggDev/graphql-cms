// Dependencies
import React, { Component } from 'react'
import {
  Alert,
  Input,
  PrimaryButton,
  RenderIf,
  Select,
  Tags,
  TextArea
} from 'fogg-ui'
import { slugFn, getRandomCode } from 'fogg-utils'
import propTypes from '@propTypes'

// Contexts
import { FormContext } from '@contexts/form'

// Styles
import styles from './Create.scss'

class Create extends Component {
  state = {
    errorMessage: '',
    successMessage: '',
    messages: {},
    randomKey: getRandomCode()
  }

  handleCreate = async values => {
    const { create } = this.props
    const { clearValues } = this.context
    const response = await create(values)

    if (response.error) {
      this.setState({
        errorMessage: response.alert,
        successMessage: '',
        messages: response.messages
      })
    } else {
      clearValues(['title', 'slug', 'content', 'tags'])

      this.setState({
        successMessage: 'Created successfuly',
        errorMessage: '',
        messages: {},
        randomKey: getRandomCode()
      })
    }
  }

  renderFields = schema => {
    const { handleInputChange, setValue, values } = this.context
    const { messages, randomKey } = this.state

    return Object.keys(schema).map(field => {
      const { label, type, options, slug, theme, defaultValue } = schema[field]
      let currentValue = values[field]

      if (type === 'input') {
        if (!values[field]) {
          currentValue = defaultValue || values[field]
        }

        return (
          <div key={field} className={styles.inputBlock}>
            <div>
              <label className={styles.label}>{label}</label>
              {messages[field] ? <span className={styles.error}>{messages[field].msg}</span> : ''}
            </div>

            <Input
              key={field}
              autoComplete="off"
              name={field}
              onChange={e => {
                handleInputChange(e)

                if (slug) {
                  setValue('slug', slugFn(e.target.value))
                }
              }}
              value={currentValue}
              placeholder={`Add ${field} here`}
              style={{
                width: '75%'
              }}
            />

            {slug && (
              <div key="slug" className={styles.slug}>
                URL: /blog/<span>{slugFn(values[field])}</span>
              </div>
            )}
          </div>
        )
      }

      if (type === 'textarea') {
        return (
          <div key={field} className={styles.textAreaBlock}>
            <div>
              <label className={styles.label}>{label}</label>
              {messages[field] ? <span className={styles.error}>{messages[field].msg}</span> : ''}
            </div>

            <TextArea
              key={`${field}-textarea`}
              name={field}
              onChange={handleInputChange}
              placeholder={`Add ${field} here`}
              style={{
                height: '300px',
                width: '75%'
              }}
            >
              {values[field]}
            </TextArea>
          </div>
        )
      }

      if (type === 'select') {
        if (!options) {
          return null
        }

        return (
          <div key={field} className={styles.selectBlock}>
            <div>
              <label className={styles.label}>{label}</label>
              {messages[field] ? <span className={styles.error}>{messages[field].msg}</span> : ''}
            </div>

            <Select
              label={`Select ${field}`}
              name={field}
              type={theme}
              onClick={({ value }) => {
                setValue(field, value)
              }}
              options={options}
            />
          </div>
        )
      }

      if (type === 'tags') {
        return (
          <div key={field}>
            <div>
              <label className={styles.label}>{label}</label>
              {messages[field] ? <span className={styles.error}>{messages[field].msg}</span> : ''}
            </div>

            <Tags key={`${field}-${randomKey}`} getTags={tags => setValue(field, tags)} />
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
  create: propTypes.create,
  module: propTypes.module,
  schema: propTypes.schema
}

export default Create
