// Dependencies
import React, { Component } from 'react'
import propTypes from '@propTypes'
import { slugFn, getRandomCode } from 'fogg-utils'

// Contexts
import { FormContext } from '@contexts/form'

// Styles
import styles from './Update.scss'

class Update extends Component {
  state = {
    errorMessage: '',
    successMessage: '',
    messages: {},
    randomKey: getRandomCode()
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const { get, id } = this.props
    const { setValues } = this.context
    const data = await get(id)

    setValues(data)
  }

  render() {
    const { values } = this.context
    console.log('VALUES', values)
    return null
  }
}

Update.contextType = FormContext

Update.propTypes = {
  get: propTypes.get,
  id: propTypes.id
}

export default Update
