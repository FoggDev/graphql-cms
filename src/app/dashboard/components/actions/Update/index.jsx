// Dependencies
import React, { useState, useEffect, useContext, memo } from 'react'
import { Alert, PrimaryButton, RenderIf } from 'fogg-ui'
import { getRandomCode, cloneObject, scrollToTop } from 'fogg-utils'
import propTypes from '@propTypes'

// Contexts
import { FormContext } from '@contexts/form'

// Components
import Fields from '@ui/Fields'

const Update = memo(({ get, update, id, caption, schema }) => {
  // States
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [messages, setMessages] = useState({})
  const [randomKey] = useState(getRandomCode())
  const [ready, setReady] = useState(false)
  const [updatedSchema, setUpdatedSchema] = useState(cloneObject(schema))

  // Contexts
  const { handleInputChange, setValues, setValue, values } = useContext(FormContext)

  // Methods
  const updateSchema = data => {
    const newSchema = cloneObject(updatedSchema)

    Object.entries(data).forEach(([key, value]) => {
      if (newSchema[key] && newSchema[key].options) {
        const currentOptionIndex = newSchema[key].options.findIndex(option => option.selected)
        const newOptionIndex = newSchema[key].options.findIndex(option => option.value === value)

        newSchema[key].options[currentOptionIndex].selected = false
        newSchema[key].options[newOptionIndex].selected = true

        setUpdatedSchema(newSchema)
      }
    })
  }

  const fetchData = async () => {
    const data = await get(id)

    if (data) {
      updateSchema(data)
      setValues(data)
      setReady(true)
    }
  }

  const handleUpdate = async data => {
    const response = await update(data)

    if (response.error) {
      setErrorMessage(response.alert)
      setSuccessMessage('')
      setMessages(response.messages)
    } else {
      setSuccessMessage('Updated successfuly')
      setErrorMessage('')
      setMessages({})
    }

    scrollToTop()
  }

  // Effects
  useEffect(() => {
    if (!ready) {
      fetchData()
    }
  }, [ready])

  // Render
  if (!updatedSchema) {
    return <p>You need to define a schema</p>
  }

  // Waiting for data to update the fields
  if (!ready) {
    return null
  }

  return (
    <>
      <h1>Edit {caption}</h1>

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
        <Fields
          schema={updatedSchema}
          values={values}
          messages={messages}
          handleInputChange={handleInputChange}
          setValue={setValue}
          randomKey={randomKey}
        />

        <PrimaryButton
          onClick={() => handleUpdate(values)}
        >
          Edit
        </PrimaryButton>
      </form>
    </>
  )
})

Update.propTypes = {
  get: propTypes.get,
  update: propTypes.update,
  id: propTypes.id,
  caption: propTypes.caption,
  schema: propTypes.schema
}

export default Update
