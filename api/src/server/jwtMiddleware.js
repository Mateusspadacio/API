/*
  Responsável por verificar o token, caso o token do usuário
  seja invalido, a API não autoriza a entrada da reqisição no endpoint
*/

const jwt = require('jsonwebtoken')

const jwtMiddleware = (deps) => {
  return async (req, res, next) => {
    if (!deps.exclusions.includes(req.href())) {
      const token = req.headers.authorization;

      if (!token) {
        res.send(403, { error: 'Token não fornecido' })
        return false
      }

      try {
        req.decoded = jwt.verify(token, process.env.JWT_SECRET)
      } catch (error) {
        res.send(403, { error: 'Falha ao autenticar o token' })
        return false
      }
    }

    next()
  }
}

module.exports = jwtMiddleware
