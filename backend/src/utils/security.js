// Dependencies
import crypto from 'crypto'

// Configuration
import { $security } from '../../config'

// Utils
import { isString, isJson, isObject } from './is'

export function encrypt(str) {
  return crypto
    .createHash('sha1')
    .update(`${$security().secretKey}${str.toString()}`)
    .digest('hex')
}

export function getBase64(value) {
  let buffer = false

  if (isString(value)) {
    buffer = Buffer.from(value, 'base64').toString('ascii')
  }

  if (isJson(buffer)) {
    buffer = JSON.parse(Buffer.from(value, 'base64').toString('ascii'))
  }

  return buffer
}

export function setBase64(value) {
  if (isObject(value)) {
    return Buffer.from(JSON.stringify(value)).toString('base64')
  } else if (isString(value)) {
    return Buffer.from(value).toString('base64')
  }

  return false
}
