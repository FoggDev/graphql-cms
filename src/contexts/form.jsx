// Dependencies
import React, { useState, createContext } from 'react'
import { element, object } from 'prop-types'

export const FormContext = createContext({
  handleInputChange: () => undefined,
  values: {}
})

const FormProvider = ({ children, initialValues = {} }) => {
  const [state, setState] = useState(initialValues)

  function handleInputChange({ target: { name, value } }) {
    setState(state => ({
      ...state,
      [name]: value
    }))
  }

  const context = {
    handleInputChange,
    values: state
  }

  return (
    <FormContext.Provider value={context}>
      {children}
    </FormContext.Provider>
  )
}

FormProvider.propTypes = {
  children: element.isRequired,
  initialValues: object
}

export default FormProvider
