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
  href: string,
  initialValues: object,
  isotype: bool,
  login: func,
  module: string,
  onClick: func,
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
