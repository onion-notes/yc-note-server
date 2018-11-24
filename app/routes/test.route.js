const router = require('koa-router')()
const testController = require('../controller/test.ctrl')

router.prefix('/test')

router.get('/', testController.test)

module.exports = router
