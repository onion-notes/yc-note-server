const client = require('../db/es')

/**
 * 创建template
 * @param name
 * @param temp
 * @returns {Promise<void>}
 */
const createTemplate = async (name, temp) => {
  await client.indices.putTemplate({
    create: false,
    name,
    body: temp
  })
}
/**
 * 创建索引
 * @param name
 * @param settings
 * @returns {Promise<void>}
 */
const createIndex = async (name, settings) => {
  await client.indices.create({
    index: name,
    body: settings
  })
}

/**
 * 验证index是否存在
 * @param name
 * @returns {Promise<*>}
 */
const existsIndex = async (name) => {
  const b = await client.indices.exists({
    index: name
  })
  return b
}

/**
 * 多条件查询
 * @param query
 * @returns {Promise<*>}
 */
const matchQuery = async (query) => {
  const res = await client.search(query)
  return res
}

module.exports = {
  createTemplate,
  existsIndex,
  createIndex,
  matchQuery
}
