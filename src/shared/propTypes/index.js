import { array, bool, element, func, shape, object, oneOfType, string } from 'prop-types'

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
  currentUrl: string,
  href: string,
  initialValues: object,
  isotype: bool,
  module: string,
  login: func,
  onClick: func,
  user: shape({
    id: string,
    username: string,
    email: string,
    privilege: string,
    active: bool,
    token: string
  })
}
