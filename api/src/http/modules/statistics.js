const db = require('../../services/mysql')

module.exports = function statistics (server) {
  server.get('statistics', async (req, res, next) => {
    try {
      res.send(await db.statistics().all())
    } catch (error) {
      res.send(422, error)
    }
    next()
  })

  server.get('statistics/:email', async (req, res, next) => {
    try {
      res.send(await db.statistics().list(req.params.email))
    } catch (error) {
      res.send(422, error)
    }
    next()
  })

  server.get('statistics/dados/:year', async (req, res, next) => {
    try {
      res.send(await db.statistics().sum(req.params.year))
    } catch(error) {
      res.send(422, error)
    }
    next()
  })

  server.post('statistics', async (req, res, next) => {
    const { email, energia, agua, tempomusica, tempotelevisao } = req.body
    console.log(req.body.email)
    try {
      res.send(await db.statistics().save(email, energia, agua, tempomusica, tempotelevisao))
    } catch (error) {
      res.send(422, error)
    }
    next()
  })

  server.put('statistics', async (req, res, next) => {
    const { id, energia, agua, tempomusica, tempotelevisao, data } = req.body
    try {
      res.send(await db.statistics().update(id, energia, agua, tempomusica, tempotelevisao, data))
    } catch (error) {
      res.send(422, error)
    }
    next()
  })

  server.del('statistics/:id', async (req, res, next) => {
    const { id } = req.params
    try {
      res.send(await db.statistics().del(id))
    } catch (error) {
      res.send(422, error)
    }
    next()
  })
}
