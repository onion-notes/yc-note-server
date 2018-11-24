const db = require('../db/pg')
const axios = require('axios')
const pug = require('pug')
const config = require('config')
const Promise = require('bluebird')
const _ = require('lodash')

const addRobot = async (userId, name, hookUrl) => {
  await db.DingRobot.create({
    userId,
    name,
    hookUrl
  })
}

const publish = async (robot) => {
  const follows = await db.Follow.findAll({
    userId: robot.userId
  })
  const types = follows.map(f => f.type)
  const list = await db.ArticlePV.findAll({
    limit: 3,
    include: [
      {
        model: db.Article,
        as: 'article',
        where: {
          isShare: true,
          type: {
            $in: types
          }
        },
        include: [
          { model: db.User, as: 'user' }
        ]
      }
    ],
    order: [['dayPV', 'DESC']]
  })
  const messageList = _.map(list, a => {
    return {
      title: a.article.title,
      imageUrl: `${config.get('serverUrl')}/${a.article.thumbPath}`,
      link: a.article.link
    }
  })
  const htmlCompile = pug.compileFile('./app/constants/dailyTopTemp.pug', {})
  const html = htmlCompile({ messageList })
  // 发送通知
  await axios({
    method: 'post',
    url: robot.hookUrl,
    headers: {
      'content-type': 'application/json;charset=utf-8'
    },
    data: {
      msgtype: 'markdown',
      markdown: {
        title: '【每日最热文章推送-洋葱分享】',
        text: html
      }
    }
  })
}

const robotPushAll = async () => {
  const robotList = await db.DingRobot.findAll({})
  await Promise.mapSeries(robotList, async r => {
    await publish(r)
  })
}

module.exports = {
  addRobot,
  robotPushAll
}
