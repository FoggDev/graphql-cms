import {
  array,
  bool,
  element,
  func,
  object,
  number,
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
  handleInputChange: func,
  head: array,
  href: string,
  id: string,
  initialValues: object,
  isotype: bool,
  messages: object,
  module: string,
  login: func,
  onClick: func,
  page: number,
  randomKey: string,
  read: func,
  schema: object,
  setValue: func,
  values: object,
  user: shape({
    id: string,
    username: string,
    email: string,
    privilege: string,
    active: bool,
    token: string
  })
}
