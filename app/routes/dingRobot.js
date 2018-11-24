const router = require('koa-router')()
const dingRobotController = require('../controller/dingRobot.ctrl')

router.prefix('/ding-robots')

router.post('/', dingRobotController.addRobot)

module.exports = router
