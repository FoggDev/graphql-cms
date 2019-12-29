import {
  array,
  bool,
  element,
  func,
  object,
  oneOfType,
  shape,
  string
} from 'prop-types'

export default {
  action: string,
  appName: string,
  body: array,
  caption: string,
  center: bool,
  children: oneOfType([
    array,
    element,
    string
  ]),
  className: string,
  content: string,
  create: func,
  currentUrl: string,
  head: array,
  href: string,
  id: string,
  initialValues: object,
  isotype: bool,
  module: string,
  login: func,
  onClick: func,
  read: func,
  schema: object,
  user: shape({
    id: string,
    username: string,
    email: string,
    privilege: string,
    active: bool,
    token: string
  })
}
