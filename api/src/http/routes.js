/*
  O Routes é responsável por centralizar todas as rotas
  da API, dessa forma fica mais facil passar o servidor
  da aplicação como parametro para os endpoints e assim
  a API consegue interceptar as chamadas http.
*/

const users = require('./modules/users')
const statistics = require('./modules/statistics')
const db = require('../services/mysql')


const routes = (server) => {
  users(server)
  statistics(server)

  server.post('authentication', async (req, res, next) => {
    try {
      const { email, password } = req.body
      res.send(await db.auth().authenticate(email, password))
    } catch (error) {
      res.send(422, error)
    }
    next()
  })

  server.get('authenticationtoken', async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      res.send(await db.auth().authenticatetoken(token, res));
    } catch(err) {
      res.send(422, err)
    }
    next()
  })

  server.post('faceauth', async (req, res, next) => {
    const { id, valid } = req.body;
    try {
      res.send(200, {msg: 'valido'})
    } catch(err) {
      res.send(422, err)
    }
    next();
  })
}

module.exports = routes
