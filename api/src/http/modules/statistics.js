/*
  Endpoints de estatistica.
  
  Eles são responsáveis por fornecer os dados de agua, energia
  gastos na casa para o aplicativo. 
*/

const db = require('../../services/mysql')

module.exports = function statistics(server) {
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
    } catch (error) {
      res.send(422, error)
    }
    next()
  })

  server.post('statistics', async (req, res, next) => {
    // {"hora":horas[-1], "data": datas[-1], "cons": cons[-1]}
    const { email, horas, datas, cons, type } = req.body
    console.log(req.body);
    try {
      res.send(await db.statistics().save(email, horas, datas, cons, type))
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
