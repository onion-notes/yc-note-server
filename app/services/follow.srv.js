const db = require('../db/pg')

const addFollows = async (userId, types) => {
  await db.Follow.bulkCreate(types.map(t => ({ userId, type: t })))
}

module.exports = {
  addFollows
}
