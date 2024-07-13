/* Código simplório, apenas para fornecer o serviço para a aplicação */

const express = require("express");
const app = express();
const routes = require("../app/routes");
const path = require("node:path");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
	);
	next();
});

routes(app);

module.exports = app;
