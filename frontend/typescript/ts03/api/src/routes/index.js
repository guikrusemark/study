/* Código simplório, apenas para fornecer o serviço para a aplicação */

const api = require("../app");

module.exports = (app) => {
	app.route("/dados").get(api.dados);
};
