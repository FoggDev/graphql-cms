// Dependencies
import jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server'

// Utils
import { encrypt, setBase64 } from './security'

// Configuration
import { $security } from '../../config'

const createTokens = async (user) => {
  const { id, username, password, email, privilege, active } = user
  const token = setBase64(`${encrypt($security().secretKey)}${password}`)
  const userData = {
    id,
    username,
    email,
    privilege,
    active,
    token
  }

  const createToken = jwt.sign(
    { data: setBase64(userData) },
    $security().secretKey,
    { expiresIn: $security().expiresIn }
  )

  return Promise.all([createToken])
}

export const doLogin = async (email, password, models) => {
  const user = await models.User.findOne({
    where: { email },
    raw: true
  })

  if (!user) {
    throw new AuthenticationError('Invalid login')
  }

  const passwordMatch = encrypt(password) === user.password
  const isActive = user.active

  if (!passwordMatch) {
    throw new AuthenticationError('Invalid login')
  }

  if (!isActive) {
    throw new AuthenticationError('Your account is not activated yet')
  }

  const [token] = await createTokens(user)

  return {
    token
  }
}
