const notificationService = require('../services/notification.srv')

const getNotificationList = async (ctx) => {
  const user = ctx.state.user
  const list = await notificationService.getNotificationListByUserId(user.id)
  ctx.body = {
    success: true,
    data: list
  }
}

module.exports = {
  getNotificationList
}
