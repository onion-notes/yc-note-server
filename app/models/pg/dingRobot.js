module.exports = (sequelize, DataTypes) => {
  const DingRobot = sequelize.define('DingRobot', {
    userId: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1 },
    name: { type: DataTypes.STRING(50), allowNull: false, comment: '机器人名字' },
    hookUrl: { type: DataTypes.STRING(200), allowNull: false, comment: '机器人Hook地址' }
  }, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'createdTime',
    updatedAt: 'updatedTime',
    tableName: 'dingRobot',
    comment: '钉钉机器人'
  })
  DingRobot.associate = function (models) {
    models.DingRobot.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' })
  }
  return DingRobot
}
