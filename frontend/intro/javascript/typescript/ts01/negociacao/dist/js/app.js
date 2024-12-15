import { NegociacaoController } from "./controllers/negociacao-controller.js";
const negociacao = new NegociacaoController();
negociacao.adiciona();
console.log(negociacao.mapNegociacao());
