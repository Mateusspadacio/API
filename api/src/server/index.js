/*
    Arquivo onde os middlewares principais estão localizados,
    quando uma requisição http é recebida pela API, ela invoca
    todos os middlewares abaixo para realizar um tratamento
    da requisição antes dela chegar no endpoint
*/

const restify = require('restify')
const server = restify.createServer()
const routes = require('../http/routes')
const cors = require('./cors')
const jwtMiddleware = require('./jwtMiddleware')

const exclusions = ['/authentication', '/authenticationtoken', '/user', '/faceauth', '/ask']

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.queryParser())
server.use(jwtMiddleware({ exclusions }))

routes(server)

module.exports = server
