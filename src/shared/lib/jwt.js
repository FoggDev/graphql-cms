// Dependencies
import jwt from 'jsonwebtoken'
import { getBase64 } from 'fogg-utils'

// Configuration
import config from '@config'

export function verify(cb, cookies = {}) {
  const { security: { secretKey } } = config
  const accessToken = cookies.at

  jwt.verify(accessToken, secretKey, (error, accessTokenData = {}) => {
    const { data: user } = accessTokenData

    if (error || !user) {
      return cb(false)
    }

    const userData = getBase64(user)

    return cb(userData)
  })
}

export async function getUserData(cookies) {
  const UserPromise = new Promise(resolve => verify(user => resolve(user), cookies))
  const user = await UserPromise
  return user
}
