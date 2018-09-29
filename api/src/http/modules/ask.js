const db = require('../../services/mysql');

module.exports = function ask(server) {
    server.get('ask', async (req, res, next) => {
        try {
            const notFound = { response: "Não entendi a sua pergunta, poderia repetir?" };
            if (!req.query.q) {
                return res.send(notFound);
            }
            res.send(await db.rh().ask(req.query.q));
        } catch (e) {
            res.send(422, notFound);
        }
    })
};