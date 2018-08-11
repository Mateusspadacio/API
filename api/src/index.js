/*
    Arquivo principal responsável por dar inicio a API
*/
require('dotenv').config()

const server = require('./server')
console.log(process.env.PORT_SERVER)
server.listen(process.env.PORT_SERVER)
