/*
  Método responsável pela autenticação do token e de login e senha do usuário,
  o mesmo  faz uma consulta ao banco de dados e verifica se login e senha são validos,
  se forem a api gera um token e envia para o cliente.
  Mas se o usuário ja tiver o token, o método authenticatetoken ira verificar se
  o mesmo é valido para que o usuário possa ter acesso a API e não digitar o seu
  email e senha novamente
*/

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
      return new Promise((resolve, reject) => {
        if (!token) {
          resolve({valid: false});
          return false
        }

        try {
          jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            resolve({valid: err ? false : true});
          });
          
        } catch (error) {
          resolve({valid: false});
          return false
        }
      })
    }
  }
}

module.exports = auth
