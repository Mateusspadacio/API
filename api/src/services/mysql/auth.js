
const sha1 = require('sha1')
const jwt = require('jsonwebtoken')

const auth = deps => {
  return {
    authenticate: (email, password) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        const queryString = 'SELECT id, email FROM users WHERE email = ? AND password = ?'
        const queryData = [email, sha1(password)]

        connection.query(queryString, queryData, (error, results) => {
          if (error || !results.length) {
            errorHandler(error, 'Falha ao localizar o usuário', reject)
            return false
          }

          const { email, id } = results[0]

          const token = jwt.sign(
            { email, id },
            process.env.JWT_SECRET,
            { expiresIn: 60 * 60 * 24 }
          )

          resolve({ id, email, token })
        })
      })
    },
    authenticatetoken: (token, res) => {
      if (!token) {
        res.send(403, {error: 'Token não fornecido'})
        return false
      }

      try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          res.send(200, {valid: err ? false : true}); 
        })
        return true;
      } catch (error) {
        res.send(403, { error: 'Falha ao autenticar o token' })
        return false
      }

    }
  }
}

module.exports = auth
