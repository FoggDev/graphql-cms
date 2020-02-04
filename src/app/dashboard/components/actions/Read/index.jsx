// Dependencies
import React, { useState, useEffect } from 'react'
import { Table, Pagination, PrimaryButton } from 'fogg-ui'
import propTypes from '@propTypes'

// Styles
import styles from './Read.scss'

const Read = ({ read, page, module, head, body, caption }) => {
  // States
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])

  // Methods
  const fetchData = async () => {
    const response = await read(Number(page))

    setCount(response.count)
    setData(response.data)
  }

  // Effects
  useEffect(() => {
    fetchData()
  }, [data, page])

  // Render
  if (data.length === 0) {
    return null
  }

  const tableData = {
    caption,
    head,
    body,
    rows: data,
    count,
    actions: {
      edit: `/dashboard/${module}/update`,
      delete: `/dashboard/${module}/delete`
    }
  }

  return (
    <div className={styles.read}>
      <PrimaryButton href={`/dashboard/${module}/create`}>Create</PrimaryButton>

      <Table data={tableData} />

      <Pagination
        theme="primary"
        page={page}
        total={count}
        url={`/dashboard/${module}?page=`}
      />
    </div>
  )
}

Read.propTypes = {
  caption: propTypes.caption,
  module: propTypes.module,
  read: propTypes.read,
  head: propTypes.head,
  body: propTypes.body,
  page: propTypes.page
}

export default Read
