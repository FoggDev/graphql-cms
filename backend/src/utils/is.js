export const isArray = variable => Array.isArray(variable)

export const isDefined = variable => typeof variable !== 'undefined' && variable !== null

export const isFalse = variable => isDefined(variable) && variable === false

export const isNumber = variable => typeof variable === 'number'

export const isFunction = variable => typeof variable === 'function'

export const isJson = str => {
  if (!str || str === null) {
    return false
  }

  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }

  return true
}

export const isObject = variable => isDefined(variable) && typeof variable === 'object' && !Array.isArray(variable)

export const isPassword = (password, min = 8) => password && password.length >= min

export const isPasswordMatch = (p1, p2) => (isPassword(p1) && isPassword(p2)) && p1 === p2

export const isString = variable => isDefined(variable) && typeof variable === 'string'

export const isUndefined = variable => typeof variable === 'undefined' || variable === null

export const isBrowser = () => typeof window !== 'undefined'
