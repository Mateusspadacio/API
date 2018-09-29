/*
  Responsável por realizar a conexão com o banco de dados 
  e manipular os errors do mesmo através da função 
  errorHandler que manipula os erros genericos do banco de dados,
  em seguida, o mesmo passa a instancia conectada para todos os
  endpoints que exigem conexão via banco para consultar algum
  dado
*/

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
const rhModule = require('./rh')(dependencies)

module.exports = {
  users: () => usersModule,
  auth: () => authModule,
  statistics: () => statisticsModule,
  rh: () => rhModule
}
