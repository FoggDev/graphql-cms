// Dependencies
import React, { useState, createContext } from 'react'
import propTypes from '@propTypes'

export const FormContext = createContext({
  handleInputChange: () => undefined,
  setValue: () => undefined,
  values: {}
})

const FormProvider = ({ children, initialValues = {} }) => {
  const [state, setState] = useState(initialValues)

  function setValue(name, value) {
    if (state[name] !== value) {
      setState(state => ({
        ...state,
        [name]: value
      }))
    }
  }

  function handleInputChange({ target: { name, value } }) {
    if (state[name] !== value) {
      setState(state => ({
        ...state,
        [name]: value
      }))
    }
  }

  function clearValues(fields) {
    const newState = Object.assign({}, state)

    fields.forEach(field => {
      newState[field] = ''
    })

    setState(newState)
  }

  function clearValue(field) {
    if (field) {
      setState(state => ({
        ...state,
        [field]: ''
      }))
    }
  }

  const context = {
    handleInputChange,
    setValue,
    clearValues,
    clearValue,
    values: state
  }

  return (
    <FormContext.Provider value={context}>
      {children}
    </FormContext.Provider>
  )
}

FormProvider.propTypes = {
  children: propTypes.children.isRequired,
  initialValues: propTypes.initialValues
}

export default FormProvider
