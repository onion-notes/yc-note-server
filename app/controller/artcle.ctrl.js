const _ = require('lodash')
const articleService = require('../services/article.srv')

const getScreenShot = async (ctx) => {
  const { link } = ctx.request.body
  ctx.assert(!_.isEmpty(link), 400, 'url不能为空')
  const result = await articleService.getPageScreenShot(link)
  ctx.body = {
    success: true,
    data: result
  }
}

const addArticle = async (ctx) => {
  const { type, description = '', link, imageName, isShare = false } = ctx.request.body
  const userId = ctx.state.user.id
  ctx.assert(_.isInteger(type), 400, 'type只能为数字')
  ctx.assert(!_.isEmpty(link), 400, 'link不能为空')
  ctx.assert(!_.isEmpty(imageName), 400, 'type不能为空')
  const id = await articleService.addArticle({ userId, type, description, link, imageName, isShare: !!isShare })
  ctx.body = {
    success: true,
    data: {
      id
    }
  }
}

const getList = async (ctx) => {
  const { dimension = 'latest', type = -1, offset = 0, limit = 10 } = ctx.query
  const result = await articleService.getList(dimension, type, offset, limit)
  ctx.body = {
    success: true,
    data: result
  }
}

const articleVisit = async (ctx) => {
  const id = ctx.params.id
  ctx.assert(id, 400, '文章id必须')
  await articleService.articleVisit(id)
  ctx.body = {
    success: true
  }
}

module.exports = {
  getScreenShot,
  addArticle,
  getList,
  articleVisit
}
