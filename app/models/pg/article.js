module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1 },
    userId: { type: DataTypes.UUID, allowNull: false, comment: '关联用户' },
    // enum.ARTICLE_TYPES
    type: { type: DataTypes.INTEGER, allowNull: false, comment: '文章类型' },
    title: { type: DataTypes.STRING(200), allowNull: false, comment: '文章标题' },
    description: { type: DataTypes.TEXT, allowNull: true, comment: '描述' },
    link: { type: DataTypes.STRING(200), allowNull: true, comment: '源文章URL' },
    thumbPath: { type: DataTypes.STRING(200), allowNull: true, comment: '缩略图路径' },
    // enum.ARTICLE_STATUS
    status: { type: DataTypes.INTEGER, defaultValue: 0, comment: '索引状态' },
    isShare: { type: DataTypes.BOOLEAN, defaultValue: false, comment: '是否分享' }
  }, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'createdTime',
    updatedAt: 'updatedTime',
    tableName: 'article',
    comment: '文章表'
  })
  Article.associate = function (models) {
    models.Article.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' })
    models.Article.hasOne(models.ArticlePV, { foreignKey: 'articleId', targetKey: 'id', as: 'pvInfo' })
  }
  return Article
}
