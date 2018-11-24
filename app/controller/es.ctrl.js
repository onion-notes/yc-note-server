const esService = require('../services/es.srv')

const search = async (ctx) => {
  const { keyword } = ctx.request.query
  ctx.assert(!!keyword, 400, 'keyword必须')
  let { offset = 0, limit = 10 } = ctx.request.query
  offset = parseInt(offset)
  limit = parseInt(limit)
  const userId = ctx.state.user.id
  const resBody = await esService.search(keyword, userId, offset, limit)
  ctx.body = {
    success: true,
    data: resBody
  }
}

module.exports = {
  search
}
