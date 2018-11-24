const _ = require('lodash')
const Sequelize = require('sequelize')
const dbConfig = require('config').get('pg')
const models = require('../models/pg')
const logger = require('../helper/log.helper').getLogger('db-pg')

const { Pool } = require('pg')
const pool = new Pool()

pool.on('error', (err) => {
  return logger.error('catch error: ', err)
})

pool.on('connect', () => {
  return logger.info(`connect to ${dbConfig.database} successfully!`)
})

const Op = Sequelize.Op
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
}

const db = {}
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: 'postgres',
  operatorsAliases,
  logging: msg => logger.info(msg),
  pool: {
    max: 5,
    min: 1,
    idle: 10000,
    acquire: 10000,
    evict: 60000,
    handleDisconnects: true
  }
})

_.forEach(models, modelCreator => {
  const model = modelCreator(sequelize, Sequelize)
  if (model && model.name) db[model.name] = model
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].options.hasOwnProperty('associate')) {
    db[modelName].options.associate(db)
  }
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

sequelize.authenticate().then(() => {
  logger.info('pg connect success')
}).catch(err => {
  logger.error(`pg connect error: ${err}`)
})

module.exports = _.extend({
  pool: pool,
  sequelize: sequelize,
  Sequelize: Sequelize
}, db)
