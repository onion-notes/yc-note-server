const client = require('../app/db/es')
const readlineSync = require('readline-sync')

const result = readlineSync.question('[危险操作] 请确认是否删除ES所有数据？（yes/no）')

if (result.toLowerCase() !== 'yes') {
  console.log('canceled...') // eslint-disable-line
} else {
  client.deleteByQuery({
    index: 'notes',
    type: 'article',
    body: {
      query: {
        match_all: {}
      }
    }
  }).then(() => {
    console.log('delete all success...') // eslint-disable-line
  }).catch((e) => {
    console.log('delete all failed: ', e) // eslint-disable-line
  })
}
