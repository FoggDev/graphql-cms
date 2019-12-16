// Dependencies
import React, { PureComponent } from 'react'
import propTypes from '@propTypes'
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
  children: propTypes.children.isRequired,
  href: propTypes.href,
  className: propTypes.className,
  onClick: propTypes.onClick
}

export default Link
