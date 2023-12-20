import { Negociacao } from "../models/negociacao.js";
export class NegociacaoController {
    constructor() {
        this._negociacoes = [];
        this._inputData = document.querySelector("#data");
        this._inputQuantidade = document.querySelector("#quantidade");
        this._inputValor = document.querySelector("#valor");
    }
    adiciona() {
        const negociacao = new Negociacao(this._inputData.valueAsDate, this._inputQuantidade.valueAsNumber, this._inputValor.valueAsNumber);
        this._negociacoes.push(negociacao);
    }
    get quantidade() {
        return this._inputQuantidade.valueAsNumber;
    }
    get data() {
        return this._inputData.valueAsDate;
    }
    get valor() {
        return this._inputValor.valueAsNumber;
    }
    mapNegociacao() {
        return {
            data: this.data,
            quantidade: this.quantidade,
            valor: this.valor
        };
    }
}
