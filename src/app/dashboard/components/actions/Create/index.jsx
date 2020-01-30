// Dependencies
import React, { useState, useContext } from 'react'
import {
  Alert,
  PrimaryButton,
  RenderIf
} from 'fogg-ui'
import { getRandomCode } from 'fogg-utils'
import propTypes from '@propTypes'

// Components
import Fields from '@ui/Fields'

// Contexts
import { FormContext } from '@contexts/form'

const Create = ({ create, caption, schema = false }) => {
  // States
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [messages, setMessages] = useState({})
  const [randomKey, setRandomKey] = useState(getRandomCode())

  // Context
  const { handleInputChange, setValue, values, clearValues } = useContext(FormContext)

  // Methods
  const handleCreate = async data => {
    const response = await create(data)

    if (response.error) {
      setErrorMessage(response.alert)
      setSuccessMessage('')
      setMessages(response.messages)
    } else {
      clearValues(['title', 'slug', 'content', 'tags'])
      setSuccessMessage('Created successfuly')
      setErrorMessage('')
      setMessages({})
      setRandomKey(getRandomCode())
    }
  }

  // Render
  if (!schema) {
    return <p>You need to define a schema</p>
  }

  return (
    <>
      <h1>Create {caption}</h1>

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
          schema={schema}
          values={values}
          messages={messages}
          handleInputChange={handleInputChange}
          setValue={setValue}
          randomKey={randomKey}
        />

        <PrimaryButton
          onClick={() => handleCreate(values)}
        >
          Save
        </PrimaryButton>
      </form>
    </>
  )
}

Create.propTypes = {
  create: propTypes.create,
  caption: propTypes.caption,
  schema: propTypes.schema
}

export default Create
