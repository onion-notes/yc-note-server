const jwt = require('jsonwebtoken')

const sign = (payload, jwtSignKey) => {
  return jwt.sign(payload, jwtSignKey)
}

module.exports = {
  sign
}
