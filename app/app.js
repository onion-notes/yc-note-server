const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const cors = require('koa2-cors')
const serve = require('koa-static')
const jwt = require('koa-jwt')
const config = require('config')
const errorHandle = require('./middleware/errorHandle.mid')
const loggerMiddleware = require('./middleware/logger.mid')
const index = require('./routes/index')

app.use(loggerMiddleware.responseLogger)
app.use(errorHandle)
app.use(cors({
  origin: () => '*',
  maxAge: 5,
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))
app.use(serve('app/public'))

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(koaLogger())
app.use(loggerMiddleware.requestLogger)
app.use(jwt({ secret: config.get('jwtSignKey'), passthrough: false }).unless({ path: [/^\/api\/public/] }))
// routes
app.use(index.routes(), index.allowedMethods())

module.exports = app
