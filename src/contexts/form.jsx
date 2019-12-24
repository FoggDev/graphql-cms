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

  function clearValues(names) {
    const newState = Object.assign({}, state)

    names.forEach(name => {
      newState[name] = ''
    })

    setState(newState)
  }

  function clearValue(name) {
    setState(state => ({
      ...state,
      [name]: ''
    }))
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
