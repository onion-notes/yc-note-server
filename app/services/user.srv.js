const db = require('../db/pg')
const config = require('config')
const _ = require('lodash')
const { CheckError } = require('../error')
const cryptoHelper = require('../helper/crypto.helper')
const jwtHelper = require('../helper/jwt.helper')
const logger = require('../helper/log.helper').getLogger('user.srv')

const signup = async (username, password, types) => {
  const {
    password: p,
    salt
  } = cryptoHelper.autoEncryptPassword(password)
  let user = await db.User.findOne({ where: { username } })
  if (user) {
    throw new CheckError(400, '用户名已存在')
  }
  const transaction = await db.sequelize.transaction()
  try {
    user = await db.User.create({
      username,
      password: p,
      salt,
      follows: _.map(types, t => ({ type: t }))
    }, {
      include: [
        {
          model: db.Follow,
          as: 'follows'
        }
      ],
      transaction
    })
    await transaction.commit()
  } catch (e) {
    logger.error(e.toString())
    await transaction.rollback()
    throw new CheckError(500, '注册失败')
  }
  return user.toJSON()
}

const signin = async (username, password) => {
  const user = await db.User.findOne({ where: { username } })
  if (!user) {
    throw new CheckError(400, '用户名密码错误')
  }
  const {
    password: p
  } = cryptoHelper.encryptPassword(password, user.salt)
  if (p !== user.password) {
    throw new CheckError(400, '用户名密码错误')
  }
  return 'Bearer ' + jwtHelper.sign({ id: user.id, username }, config.get('jwtSignKey'))
}

const getUserById = async (id) => {
  const user = await db.User.findById(id, {
    include: [
      {
        model: db.Follow,
        as: 'follows'
      }
    ]
  })
  if (!user) {
    return null
  }
  const json = user.toJSON()
  delete json.password
  return json
}

module.exports = {
  signup,
  signin,
  getUserById
}
