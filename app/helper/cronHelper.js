const config = require('config')
const CronJob = require('cron').CronJob
const articlesService = require('../services/article.srv')
const dingRobotService = require('../services/dingRobot.srv')
const logger = require('./log.helper').getLogger('CronHelper')

const articleCron = config.get('articleCron')
const robotPushCron = config.get('robotPushCron')

const articlePVResetJob = new CronJob(articleCron, async () => {
  await articlesService.resetArticlePV()
}, () => {
  logger.error('定时任务articlePVResetJob停止运行...')
}, false, 'Asia/Shanghai')

const robotPushCronJob = new CronJob(robotPushCron, async () => {
  await dingRobotService.robotPushAll()
  logger.info('dingding robot push success...')
}, () => {
  logger.error('定时任务robotPushCronJob停止运行...')
}, false, 'Asia/Shanghai')

const startCron = () => {
  articlePVResetJob.start()
  // robotPushCronJob.start()
  logger.info('定时任务启动...')
}

module.exports = {
  startCron
}
