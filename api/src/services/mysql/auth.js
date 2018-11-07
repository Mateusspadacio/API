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
    authenticate: (id_facial, password) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        const queryString = 'SELECT id, id_facial, face_validada FROM funcionario WHERE (id_facial = ? OR email = ?) AND senha = ?';
        const queryData = [id_facial, id_facial, sha1(password)]

        connection.query(queryString, queryData, (error, results) => {
          if (error || !results.length) {
            errorHandler(error, 'Falha ao localizar o usuário', reject)
            return false
          }

          const { id_facial, id } = results[0]

          const token = jwt.sign(
            { id_facial, id },
            process.env.JWT_SECRET,
            { expiresIn: 60 * 60 * 24 }
          )

          resolve({ id, id_facial, token })
        })
      })
    },
    authenticatetoken: (token, res) => {
      return new Promise((resolve, reject) => {
        if (!token) {
          resolve({ valid: false });
          return false
        }

        try {
          jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            resolve({ valid: err ? false : true });
          });

        } catch (error) {
          resolve({ valid: false });
          return false
        }
      })
    },
    authenticateface: (id, valid) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps;
        const queryString = 'SELECT id_facial FROM funcionario WHERE id_facial = ?';
        connection.query(queryString, [id], (error, results) => {
          if (error) return reject(error);
          if (!results[0]) return reject({ error: "Usuario não encontrado" })
          connection.query('UPDATE funcionario SET face_validada = 1 WHERE id_facial = ?', [results[0].id_facial], (error) => {
            if (error) return reject(error);
            resolve({ id_facial: results[0].id_facial, valid: true });
          })
        });
      });
    }
  }
}

module.exports = auth
