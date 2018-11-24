const router = require('koa-router')()
const esController = require('../controller/es.ctrl')

router.prefix('/search')

router.get('/', esController.search)

module.exports = router
