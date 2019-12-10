// Dependencies
import React, { PureComponent } from 'react'
import { array, element, func, string, oneOfType } from 'prop-types'
import NextLink from 'next/link'

class Link extends PureComponent {
  render() {
    const { href, children, className, onClick } = this.props
    const linkProps = {
      onClick,
      className
    }

    return (
      <NextLink
        as={href}
        href={href}
      >
        <a {...linkProps}>{children}</a>
      </NextLink>
    )
  }
}

Link.propTypes = {
  children: oneOfType([
    array,
    element,
    string
  ]).isRequired,
  className: string,
  onClick: func
}

export default Link
