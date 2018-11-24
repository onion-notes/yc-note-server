const config = require('config')
const esHelper = require('../helper/es.helper')
const temp = require('../elastic_search/template')
const notes = require('../elastic_search/notes')

const autoCreateTemplate = async () => {
  return esHelper.createTemplate('template_1', temp)
}

const autoCreateIndex = async () => {
  const isExists = await esHelper.existsIndex('notes')
  if (!isExists) {
    await esHelper.createIndex('notes', notes)
  }
}

const search = async (keyword, userId, offset = 0, limit = 10) => {
  const search = {
    index: config.get('esIndex'),
    type: config.get('esType'),
    _source: ['userId', 'type', 'title', 'description', 'link', 'thumbPath', 'createdAt'],
    body: {
      query: {
        bool: {
          must: [
            {
              multi_match: {
                query: keyword,
                fields: ['title^2', 'content']
              }
            }
          ],
          minimum_should_match: 1,
          should: [
            {
              term: { userId }
            },
            {
              term: { isShare: true }
            }
          ]
        }
      },
      highlight: {
        fields: {
          content: {}
        },
        pre_tags: ['<span style="color:red">'],
        post_tags: ['</span>'],
        fragment_size: 50,
        number_of_fragments: 3
      }
    },
    from: offset,
    size: limit
  }
  const { hits } = await esHelper.matchQuery(search)
  hits.offset = offset
  hits.limit = limit
  hits.keyword = keyword
  return hits
}

module.exports = {
  autoCreateTemplate,
  autoCreateIndex,
  search
}
