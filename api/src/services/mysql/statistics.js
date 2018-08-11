/*
  Métodos responsáveis por se comunicar com o banco de dados 
  e coletar as informações de estatisticas da casa
*/

const statistics = deps => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT * FROM statistics', (error, results) => {
          if (error) {
            errorHandler(error, 'Ocorreu um erro ao consultar as estatisticas', reject)
            return false
          }

          resolve({ statistics: results })
        })
      })
    },
    sum: (year) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        const query = "SELECT month, year, sum(water) as twater, sum(energy) as tenergy FROM statistics WHERE year = ? GROUP BY month";
        connection.query(query, [year], (error, results) => {
          if (error) {
            errorHandler(error, 'Ocorreu um erro ao consultar as estatisticas', reject)
            return false
          }
          resolve({ statisticsTotal: results })
        })

      });
    },
    one: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT * FROM statistics WHERE id = ?', id, (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao obter a estatistica', reject)
            return false
          }
          resolve({ product: results[0] })
        })
      })
    },
    save: (email, energia, agua, tempomusica, tempotelevisao) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('CALL func_insert_statistics(?, ?, ?, ?, ?)', 
        [email, energia, agua, tempomusica, tempotelevisao], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao salvar as estatisticas`, reject)
            return false
          }
          resolve({ sucess: 'Estatistica inserida com sucesso' })
        })
      })
    },
    update: (id, energia, agua, tempomusica, tempotelevisao, data) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('UPDATE statistics SET energia = ?, agua = ?, tempomusica = ?, tempotelevisao = ?, data = ? WHERE id = ?', 
        [energia, agua, tempomusica, tempotelevisao, data, id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao atualizar a estatistica de id ${id}`, reject)
            return false
          }
          resolve({ statistic: {id, energia, agua, tempomusica, tempotelevisao, data} })
        })
      })
    },
    del: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('DELETE FROM statistics WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover a estatistica de id ${id}`, reject)
            return false
          }
          resolve({ message: 'Estatistica removida com sucesso!', affectedRows: results.affectedRows })
        })
      })
    }
  }
}

module.exports = statistics
