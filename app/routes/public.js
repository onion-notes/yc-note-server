const router = require('koa-router')()
const userController = require('../controller/user.ctrl')
const articleController = require('../controller/artcle.ctrl')

router.prefix('/public')

router.post('/signup', userController.signup)
router.post('/signin', userController.signin)
router.get('/articles', articleController.getList)

module.exports = router
