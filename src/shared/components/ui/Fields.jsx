// Dependencies
import React, { memo } from 'react'
import {
  Input,
  Select,
  Tags,
  TextArea
} from 'fogg-ui'
import { slugFn } from 'fogg-utils'
import propTypes from '@propTypes'

// Styles
import styles from './Fields.scss'

const Fields = memo(({ schema, values, messages, handleInputChange, setValue, randomKey }) => {
  const fields = Object.keys(schema).map(field => {
    const { tags = [] } = values
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
            key={`select-${randomKey}`}
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

          <Tags
            key={`tags-${randomKey}`}
            getTags={tags => setValue(field, tags)}
            tags={tags}
          />
        </div>
      )
    }

    return null
  })

  return (
    <div className={styles.fields}>
      {fields}
    </div>
  )
})

Fields.propTypes = {
  schema: propTypes.schema,
  values: propTypes.values,
  messages: propTypes.messages,
  handleInputChange: propTypes.handleInputChange,
  setValue: propTypes.setValue,
  randomKey: propTypes.randomKey
}

export default Fields
