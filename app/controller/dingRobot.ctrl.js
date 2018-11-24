const _ = require('lodash')
const dingRobotService = require('../services/dingRobot.srv')

const addRobot = async (ctx) => {
  const { name, hookUrl } = ctx.request.body
  ctx.assert(!_.isEmpty(name), 400, 'name不能为空')
  ctx.assert(!_.isEmpty(hookUrl), 400, 'hookUrl不能为空')
  const user = ctx.state.user
  await dingRobotService.addRobot(user.id, name, hookUrl)
  ctx.body = {
    success: true
  }
}

module.exports = {
  addRobot
}
