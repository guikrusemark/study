const http = require("node:http");
const app = require("./config/express");

http.createServer(app).listen(8081, function () {
	console.log(`Servidor escutando na porta: ${this.address().port}`);
});