const _ = require('lodash')
const followService = require('../services/follow.srv')

const addFollows = async (ctx) => {
  const { types } = ctx.request.body
  ctx.assert(!_.isEmpty(types), 400, 'types不能为空')
  const user = ctx.state.user
  await followService.addFollows(user.id, types)
  ctx.body = {
    success: true
  }
}

module.exports = {
  addFollows
}
