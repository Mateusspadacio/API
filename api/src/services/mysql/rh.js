/*
    RH eletronico,
    responsavel por realizar a consulta no banco de dados com base
    na fala enviada pela api em python, as constantes a baixo são 
    todas as frases que a api consegue capturar no momento
*/

const {
    QUAIS_MEUS_BENEFICIOS,
    MEU_PROXIMO_EXAME_PERIODICO,
    DATA_PREVISTA_PARA_O_PROXIMO_REAJUSTE_SALARIAL,
    A_PARTIR_DE_QUANDO_POSSO_USUFRUIT_DAS_MINHAS_FERIAS,
    QUANTAS_HORAS_EXTRAS_EU_FIZ_ESSE_MES,
    QUANTAS_HORAS_EXTRAS_AINDA_POSSO_FAZER,
    QUAL_A_QUANTIDADE_DO_MEU_BANCO_DE_HORAS,
    QUAL_O_VALOR_PREVISTO_DO_PLR,
    O_HOLERITE_JA_FOI_FECHADO,
    QUERO_FAZER_PARTE_DA_BRIGADA_DE_INCENDIO,
    QUERO_FAZER_PARTE_CIPA,
    DE_QUE_FORMA_A_EMPRESA_CONTRIBUI_PARA_O_MEIO_AMBIENTE,
    QUAIS_CERTIFICACOES_A_EMPRESA_POSSUI,
    QUAL_O_CRESCIMENTO_DA_EMPRESA
} = require('../enums/questions');

const getData = ({ connection, errorHandler }, q, params) => {
    return new Promise((resolve, reject) => {
        connection.query(q, params, (error, results) => {
            if (error) {
                errorHandler(error, 'Falha na comunicação com o banco', reject)
                return false;
            }
            resolve(results);
        })
    });
};

const rh = deps => {
    return {
        ask: async ({ q, name }) => {
            let result;
            switch (q) {
                case QUAIS_MEUS_BENEFICIOS:
                    return await getData(deps, 'SELECT beneficios FROM funcionario WHERE nome = ?', [name]);
                case MEU_PROXIMO_EXAME_PERIODICO:
                    return await getData(deps, 'SELECT exameperiodico FROM funcionario WHERE nome = ?', [name]);
                case DATA_PREVISTA_PARA_O_PROXIMO_REAJUSTE_SALARIAL:
                    return await getData(deps, 'SELECT datareajuste FROM funcionario WHERE nome = ?', [name]);
                case A_PARTIR_DE_QUANDO_POSSO_USUFRUIT_DAS_MINHAS_FERIAS:
                    return await getData(deps, 'SELECT dataferias FROM funcionario WHERE nome = ?', [name]);
                case QUANTAS_HORAS_EXTRAS_EU_FIZ_ESSE_MES:
                    return await getData(deps, 'SELECT horaextra FROM funcionario WHERE nome = ?', [name]);
                case QUANTAS_HORAS_EXTRAS_AINDA_POSSO_FAZER:
                    result = await getData(deps, 'SELECT horaextra FROM funcionario WHERE nome = ?', [name]);
                    return { amount: 48 - result[0].horaextra };
                case QUAL_A_QUANTIDADE_DO_MEU_BANCO_DE_HORAS:
                    return await getData(deps, 'SELECT bancohoras FROM funcionario WHERE nome = ?', [name]);
                case QUAL_O_VALOR_PREVISTO_DO_PLR:
                    return await getData(deps, 'SELECT plr FROM empresa', []);
                case O_HOLERITE_JA_FOI_FECHADO:
                    return await getData(deps, 'SELECT dataholerite FROM funcionario WHERE nome = ?', [name]);
                case QUERO_FAZER_PARTE_DA_BRIGADA_DE_INCENDIO:
                    return await getData(deps, 'INSERT INTO insc_b_incendio(fk_id_funcionario, nome, data) VALUES((SELECT id FROM funcionario WHERE nome = ?), ?, now())', [name, 'Brigada']);
                case QUERO_FAZER_PARTE_CIPA:
                    return await getData(deps, 'INSERT INTO insc_b_incendio(fk_id_funcionario, nome, data) VALUES((SELECT id FROM funcionario WHERE nome = ?), ?, now())', [name, 'Cipa']);
                case DE_QUE_FORMA_A_EMPRESA_CONTRIBUI_PARA_O_MEIO_AMBIENTE:
                    return await getData(deps, 'SELECT polambiente FROM empresa', []);
                case QUAIS_CERTIFICACOES_A_EMPRESA_POSSUI:
                    return await getData(deps, 'SELECT certificacoes FROM empresa', []);
                case QUAL_O_CRESCIMENTO_DA_EMPRESA:
                    return await getData(deps, 'SELECT crescimento FROM empresa', []);
                default:
                    reject({ response: 'Não entendi a sua pergunta, poderia repetir?' });
            }
        }
    }
}

module.exports = rh;