// Dependencies
import jwt from 'jsonwebtoken'
import { getBase64 } from 'fogg-utils'

// Configuration
import config from '@config'

export function User(req) {
  const { security: { secretKey } } = config

  function jwtVerify(cb, at = false) {
    const accessToken = req.cookies.at || at

    jwt.verify(accessToken, secretKey, (error, accessTokenData = {}) => {
      const { data: user } = accessTokenData

      if (error || !user) {
        return cb(false)
      }

      return cb(getBase64(user))
    })
  }

  async function getUserData() {
    const UserPromise = new Promise(resolve => jwtVerify(user => resolve(user)))
    const user = await UserPromise
    return user
  }

  return {
    jwtVerify,
    getUserData
  }
}

export const isConnected = (isLogged = true, privilege = 'user', redirectTo = '/') => (req, res, next) => {
  User(req).jwtVerify(user => {
    if (!user && !isLogged) {
      return next()
    } else if (user && isLogged) {
      if (privilege === 'god') {
        if (user.privilege === 'god') {
          return next()
        } else {
          res.redirect(redirectTo)
        }
      } else if (privilege === 'user' && user.privilege === 'user') {
        return next()
      }
    } else {
      res.redirect(redirectTo)
    }
  })
}

export default (req, res, next) => {
  res.user = User(req)

  return next()
}
