// Configuration
import common from './common.json'
import local from './local.json'
import production from './production.json'

// Configurations by environment
const config = {
  local: {
    ...common,
    ...local
  },
  production: {
    ...common,
    ...production
  }
}

// development => local
let env = 'local'

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
  env = process.env.NODE_ENV
}

// Environments validations
export const isLocal = () => env === 'local'
export const isProduction = () => env === 'production'

// Configuration
export default config[env]
