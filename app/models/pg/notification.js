module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1 },
    userId: { type: DataTypes.UUID, allowNull: false, comment: '用户Id' },
    articleId: { type: DataTypes.UUID, allowNull: false, comment: '文章Id' },
    deleted: { type: DataTypes.BOOLEAN, defaultValue: false, comment: '软删除标记' }
  }, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'createdTime',
    updatedAt: 'updatedTime',
    tableName: 'notification',
    comment: '用户通知'
  })
  Notification.associate = function (models) {
    models.Notification.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' })
    models.Notification.belongsTo(models.Article, { foreignKey: 'articleId', targetKey: 'id', as: 'article' })
  }
  return Notification
}
