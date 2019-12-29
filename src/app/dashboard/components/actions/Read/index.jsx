// Dependencies
import React, { Component } from 'react'
import { Table, Pagination, PrimaryButton } from 'fogg-ui'
import propTypes from '@propTypes'

// Styles
import styles from './Read.scss'

class Read extends Component {
  state = {
    count: 0,
    data: []
  }

  async componentDidMount() {
    const { read } = this.props

    const { count, data } = await read()

    this.setState({
      count,
      data
    })
  }

  render() {
    const { module, head, body, caption } = this.props
    const { count, data } = this.state

    if (data.length === 0) {
      return null
    }

    const tableData = {
      caption,
      head,
      body,
      rows: data,
      actions: {
        edit: `/dashboard/${module}/update`,
        delete: `/dashboard/${module}/delete`
      }
    }

    return (
      <div className={styles.read}>
        <PrimaryButton href="/dashboard/blog/create">Create Post</PrimaryButton>

        <Table data={tableData} />

        <Pagination
          theme="primary"
          total={count}
          url={`/dashboard/${module}/page/`}
        />
      </div>
    )
  }
}

Read.propTypes = {
  caption: propTypes.caption,
  module: propTypes.module,
  read: propTypes.read,
  head: propTypes.head,
  body: propTypes.body
}

export default Read
