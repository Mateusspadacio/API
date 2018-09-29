const { QUAIS_SAO_MEUS_BENEFICIOS } = require('../enums/questions');

const getBenefits = ({ connection, errorHandler }, resolve, reject) => {
    connection.query('SELECT descricao FROM beneficio', (error, results) => {
        if (error) {
            errorHandler(error, 'Falha ao encontrar os beneficios', reject)
            return false
        }
        resolve(results);
    })
};

const rh = deps => {
    return {
        ask: (q) => {
            return new Promise((resolve, reject) => {
                switch (q) {
                    case QUAIS_SAO_MEUS_BENEFICIOS:
                        getBenefits(deps, resolve, reject);
                        break;
                    default:
                        reject();
                }
            })
        }
    }
}

module.exports = rh;