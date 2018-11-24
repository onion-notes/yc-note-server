const router = require('koa-router')()
const notificationController = require('../controller/notification.ctrl')

router.prefix('/notifications')

router.get('/', notificationController.getNotificationList)

module.exports = router
