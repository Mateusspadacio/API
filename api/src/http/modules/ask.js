const db = require('../../services/mysql')

module.exports = function ask(server) {
  server.get('ask', async (req, res, next) => {
    try {
      if (!req.query.q) {
        return res.send({ response: 'Não há pergunta' })
      }

      res.send(await db.rh().ask(req.query))
    } catch (e) {
      res.send(422, e)
    }
  })
}
