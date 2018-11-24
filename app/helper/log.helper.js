const log4js = require('log4js')
const LOG_LEVEL = require('config').get('logConfig').level

const getLogger = (category) => {
  const logger = log4js.getLogger(category)
  logger.level = LOG_LEVEL || 'all'
  return logger
}

module.exports = {
  getLogger
}
