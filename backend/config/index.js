// Configuration
import config from './config.json'

// Configurations
export const $db = () => config.db
export const $security = () => config.security
export const $serverPort = () => config.serverPort
