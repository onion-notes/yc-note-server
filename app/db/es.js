const es = require('elasticsearch')

const client = new es.Client({
  host: 'localhost:9200'
})

module.exports = client
