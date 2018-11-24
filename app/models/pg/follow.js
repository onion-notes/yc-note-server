module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1 },
    userId: { type: DataTypes.UUID, allowNull: false, comment: '用户Id' },
    type: { type: DataTypes.INTEGER, allowNull: false, comment: '文章类型' }
  }, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'createdTime',
    updatedAt: 'updatedTime',
    tableName: 'follow',
    comment: '用户关注'
  })
  Follow.associate = function (models) {
    models.Follow.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' })
  }
  return Follow
}
