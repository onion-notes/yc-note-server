const router = require('koa-router')()
const userController = require('../controller/user.ctrl')

router.prefix('/users')

router.get('/me', userController.getMe)
router.get('/articles', userController.getUserArticleList)
module.exports = router
