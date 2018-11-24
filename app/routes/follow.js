const router = require('koa-router')()
const followController = require('../controller/follow.ctrl')

router.prefix('/follows')

router.post('/', followController.addFollows)

module.exports = router
