// Dependencies
import React, { useState, useContext } from 'react'

// Contexts
import { FormContext } from '@contexts/form'
import { UserContext } from '@contexts/user'

const Fields = ({ schema }) => {
  const { user } = useContext(UserContext)
  const { handleInputChange, setValue, values } = this.context
  const { messages, randomKey } = this.state

  if (!schema) {
    return <p>You need to define a schema</p>
  }

  return Object.keys(schema).map(field => {
    const { label, type, options, slug, theme, defaultValue } = schema[field]
    let currentValue = values[field]

    if (type === 'input') {
      if (!values[field]) {
        currentValue = defaultValue || values[field]
      }

      return (
        <div key={`div-${field}`} className={styles.inputBlock}>
          <div>
            <label className={styles.label}>{label}</label>
            {messages[field] ? <span className={styles.error}>{messages[field].msg}</span> : ''}
          </div>

          <Input
            key={`input-${field}`}
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
        <div key={`textarea-div-${field}`} className={styles.textAreaBlock}>
          <div>
            <label className={styles.label}>{label}</label>
            {messages[field] ? <span className={styles.error}>{messages[field].msg}</span> : ''}
          </div>

          <TextArea
            key={`textarea-${field}`}
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
        <div key={`div-select-${field}`} className={styles.selectBlock}>
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
        <div key="div-tags">
          <div>
            <label className={styles.label}>{label}</label>
            {messages[field] ? <span className={styles.error}>{messages[field].msg}</span> : ''}
          </div>

          <Tags key={`tags-${randomKey}`} getTags={tags => setValue(field, tags)} />
        </div>
      )
    }

    return null
  })
}

export default Fields
