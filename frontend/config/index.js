// Configuration
import common from './common.json'
import local from './local.json'
import production from './production.json'

// Config container
let config

// Configurations by environment
const configurations = {
  local: {
    baseUrl: local.baseUrl,
    api: local.api,
    cache: local.cache,
    debug: local.debug,
    languages: common.languages,
    security: common.security,
    serverPort: common.serverPort,
    session: local.session
  },
  production: {
    baseUrl: production.baseUrl,
    api: production.api,
    cache: production.cache,
    debug: production.debug,
    languages: common.languages,
    security: common.security,
    serverPort: common.serverPort,
    session: production.session
  }
}

// development => local
let env = 'local'

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
  env = process.env.NODE_ENV
}

// Environments
export const isLocal = () => env === 'local'
export const isProduction = () => env === 'production'

// Configuration
export default !config ? configurations[env] : config
