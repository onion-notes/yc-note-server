const crypto = require('crypto')
const uuidv4 = require('uuid/v4')

const encryptPassword = (password, salt) => {
  return {
    salt,
    password: crypto
      .pbkdf2Sync(password, salt, 10, salt.length, 'sha1')
      .toString('hex')
  }
}

const autoEncryptPassword = (password) => {
  const salt = uuidv4()
  return {
    salt,
    password: crypto
      .pbkdf2Sync(password, salt, 10, salt.length, 'sha1')
      .toString('hex')
  }
}

module.exports = {
  encryptPassword,
  autoEncryptPassword
}
