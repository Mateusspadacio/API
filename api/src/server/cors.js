/*
  Autoriza alguns cors para que a aplicação possa aceitar
  tipos especificos de heders ou origens externas
*/
const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['*'],
  allowHeaders: ['*', 'x-access-token', 'authorization'],
  exposeHeaders: ['*']
})

module.exports = cors
