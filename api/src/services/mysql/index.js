
const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.PORT
})


const errorHandler = (error, msg, rejectFunction) => {
  if (error) console.error(error)
  rejectFunction({ error: msg })
}

const dependencies = { connection, errorHandler }

const usersModule = require('./users')(dependencies)
const authModule = require('./auth')(dependencies)
const statisticsModule = require('./statistics')(dependencies)

module.exports = {
  users: () => usersModule,
  auth: () => authModule,
  statistics: () => statisticsModule
}
