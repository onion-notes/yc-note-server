const pkg = require('../../package')
const config = require('config')
const logger = require('../helper/log.helper').getLogger('errorHandleMiddleware')
const { HttpRequestError, HttpResponseError } = require('../error')

module.exports = async (ctx, next) => {
  try {
    await next()
    const status = ctx.status || 404
    if (status === 404) {
      ctx.status = 404
      if (config.util.getEnv('NODE_CONFIG_ENV') === 'development') {
        ctx.body = pkg.apidoc
        return
      }
    }
  } catch (err) {
    const body = {
      success: false,
      msg: '系统繁忙',
      debug: '系统繁忙',
      type: ''
    }
    switch (true) {
      case err instanceof HttpRequestError || err instanceof HttpResponseError:
        logger.error(err)
        ctx.status = 500
        break
      case err.status && err.status === 401:
        ctx.status = 401
        body.msg = '请登录'
        body.debug = '请登录'
        break
      case err.status && err.status === 400:
        ctx.status = 400
        body.msg = err.message
        body.debug = err.message
        break
      default:
        logger.error(err)
        ctx.status = 500
        break
    }
    ctx.body = body
  }
}
