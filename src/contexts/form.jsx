// Dependencies
import React, { useState, createContext } from 'react'
import propTypes from '@propTypes'

export const FormContext = createContext({
  handleInputChange: () => undefined,
  setValue: () => undefined,
  setValues: () => undefined,
  clearValues: () => undefined,
  clearValue: () => undefined,
  values: {}
})

const FormProvider = ({ children, initialValues = {} }) => {
  const [state, setState] = useState(initialValues)

  function setValues(values) {
    const newState = Object.assign({}, state, values)
    setState(newState)
  }

  function setValue(name, value) {
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
      setValue(field, '')
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

  const context = {
    handleInputChange,
    setValue,
    setValues,
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
