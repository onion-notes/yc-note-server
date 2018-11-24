const { sequelize } = require('../app/db/pg')
const readlineSync = require('readline-sync')

const result = readlineSync.question('[危险操作] 请确认是否强制将模型同步到PG数据库？（yes/no）')

if (result.toLowerCase() !== 'yes') {
  console.log('canceled...') // eslint-disable-line
} else {
  sequelize.sync({ force: true }).then(() => {
    console.log('sync success...') // eslint-disable-line
    process.exit(0)
  }).catch((e) => {
    console.log(e) // eslint-disable-line
  })
}
