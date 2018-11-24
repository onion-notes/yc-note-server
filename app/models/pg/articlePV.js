const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const ArticlePV = sequelize.define('ArticlePV', {
    articleId: { type: DataTypes.UUID, primaryKey: true },
    stars: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, comment: '推荐数' },
    pv: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, comment: '总pv' },
    dayPV: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, comment: '日pv' },
    dayStr: { type: DataTypes.STRING(20), allowNull: false, defaultValue: () => moment().format('YYYY-MM-DD'), comment: '日字符串' },
    weekPV: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, comment: '周pv' },
    weekNumber: { type: DataTypes.INTEGER, allowNull: false, defaultValue: () => moment().week(), comment: '本年星期编号' },
    monthPV: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, comment: '月pv' },
    monthStr: { type: DataTypes.STRING(20), allowNull: false, defaultValue: () => moment().format('YYYY-MM'), comment: '月字符串' }
  }, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'createdTime',
    updatedAt: 'updatedTime',
    tableName: 'articlePV',
    comment: '文章PV表'
  })
  ArticlePV.associate = function (models) {
    models.ArticlePV.belongsTo(models.Article, { foreignKey: 'articleId', targetKey: 'id', as: 'article' })
  }
  return ArticlePV
}
