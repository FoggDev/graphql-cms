// Dependencies
import React, { PureComponent } from 'react'
import Head from 'next/head'
import propTypes from '@propTypes'

class Title extends PureComponent {
  render() {
    const { content } = this.props

    return (
      <Head>
        <title>{content}</title>
        <meta name="title" content={content} />
      </Head>
    )
  }
}

Title.propTypes = {
  content: propTypes.content.isRequired
}

export default Title
