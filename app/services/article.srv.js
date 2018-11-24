const db = require('../db/pg')
const esClient = require('../db/es')
const config = require('config')
const _ = require('lodash')
const moment = require('moment')
const { CheckError } = require('../error')
const notificationService = require('./notification.srv')
const browserHelper = require('../helper/browser.helper')
const logger = require('../helper/log.helper').getLogger('article.srv')

const getPageScreenShot = async (url) => {
  const { name, title } = await browserHelper.getPageInfo(url)
  return {
    imageUrl: `${config.get('serverUrl')}/${name}`,
    name,
    title
  }
}

const addArticle = async ({ userId, type, description = '', link, imageName, isShare }) => {
  const { title, bodyText } = await browserHelper.getPageContent(link)
  const body = {
    userId,
    type,
    title,
    description,
    link,
    thumbPath: imageName,
    isShare,
    pvInfo: {}
  }
  const transaction = await db.sequelize.transaction()
  let article
  try {
    article = await db.Article.create(body, {
      include: [
        {
          model: db.ArticlePV,
          as: 'pvInfo'
        }
      ],
      transaction
    })
    // 插入es
    body.content = bodyText
    body.createdAt = Date.now()
    const esBody = {
      index: config.get('esIndex'),
      type: config.get('esType'),
      id: article.id,
      body
    }
    await esClient.create(esBody)
    // 添加通知
    if (isShare) {
      await notificationService.addNotification(article.id, type, transaction)
    }
    await transaction.commit()
  } catch (e) {
    logger.error(e.toString())
    await transaction.rollback()
    throw new CheckError(500, '添加文章失败')
  }
  return article.id
}

/**
 * 获取各维度分享文章列表
 * @param dimension
 * @param type
 * @param offset
 * @param limit
 * @returns {Promise<{total: *, data: Array}>}
 */
const getList = async (dimension = 'latest', type = -1, offset = 0, limit = 10) => {
  const where = {
    isShare: true
  }
  const order = []
  if (parseInt(type) !== -1 && dimension !== 'latest') {
    where.type = type
  }
  switch (dimension) {
    case 'latest':
      order.push(['createdTime', 'DESC'])
      break
    case 'day':
      order.push(['dayPV', 'DESC'])
      break
    case 'week':
      order.push(['weekPV', 'DESC'])
      break
    case 'month':
      order.push(['monthPV', 'DESC'])
      break
  }
  const pageObj = await db.ArticlePV.findAndCountAll({
    offset,
    limit,
    include: [
      {
        model: db.Article,
        as: 'article',
        where,
        include: [
          { model: db.User, as: 'user' }
        ]
      }
    ],
    order
  })
  return {
    offset,
    limit,
    type,
    dimension,
    total: pageObj.count,
    data: _.map(pageObj.rows, v => v.toJSON())
  }
}

const articleVisit = async (id) => {
  let result
  try {
    result = await db.ArticlePV.update(
      {
        pv: db.sequelize.literal('"pv"+1'),
        dayPV: db.sequelize.literal('"dayPV"+1'),
        weekPV: db.sequelize.literal('"weekPV"+1'),
        monthPV: db.sequelize.literal('"monthPV"+1')
      },
      { where: { articleId: id } }
    )
  } catch (e) {
    logger.error(e)
  }
  return result
}

const resetArticlePV = async () => {
  const dayStr = moment().format('YYYY-MM-DD')
  const monthStr = moment().format('YYYY-MM')
  const weekNumber = moment().week()
  try {
    await db.ArticlePV.update({
      dayPV: 0,
      weekPV: 0,
      monthPV: 0
    }, {
      where: {
        dayStr: {
          $ne: dayStr
        },
        weekNumber: {
          $ne: weekNumber
        },
        monthStr: {
          $ne: monthStr
        }
      }
    })
  } catch (e) {
    logger.error(e)
  }
}

const getListByUserId = async (userId, type = -1, offset = 0, limit = 10) => {
  const where = {
    userId
  }
  if (parseInt(type) !== -1) {
    where.type = type
  }
  const pageObj = await db.Article.findAndCountAll({
    where,
    offset,
    limit,
    order: [['createdTime', 'DESC']]
  })
  return {
    offset,
    limit,
    type,
    total: pageObj.count,
    data: _.map(pageObj.rows, v => v.toJSON())
  }
}

module.exports = {
  getPageScreenShot,
  addArticle,
  getList,
  articleVisit,
  resetArticlePV,
  getListByUserId
}
