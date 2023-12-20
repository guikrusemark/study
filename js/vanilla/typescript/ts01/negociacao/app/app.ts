import { NegociacaoController } from './controllers/negociacao-controller.js';

const negociacao: NegociacaoController = new NegociacaoController();
negociacao.adiciona();

console.log(negociacao.mapNegociacao())
