require('../db/pg')
const test = async (ctx) => {
  ctx.body = {
    ok: true
  }
}

module.exports = {
  test
}
