const _ = require('lodash')
const logger = require('../helper/log.helper').getLogger('loggerMiddleware')

const headerNames = ['uid', 'content-type', 'authorization']

const requestLogger = async (ctx, next) => {
  const params = ctx.params || {}
  const search = ctx.query || {}
  const body = ctx.request.body || {}
  logger.trace('request.headers', _.pick(ctx.request.headers, headerNames))
  logger.trace('request params:', params)
  logger.trace('request search:', search)
  logger.trace('request body:', body)
  await next()
}

const responseLogger = async (ctx, next) => {
  await next()
  const body = ctx.body || {}
  const contentType = ctx.response.header['content-type']
  logger.trace('response contentType:', contentType)
  logger.trace('response body:', body)
}

module.exports = {
  requestLogger,
  responseLogger
}
