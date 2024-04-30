import { Negociacao } from "../models/negociacao.js";

export class NegociacaoController {
	private _inputData: HTMLInputElement;
	private _inputQuantidade: HTMLInputElement;
	private _inputValor: HTMLInputElement;
	private _negociacoes: Negociacao[] = [];

	constructor() {
		this._inputData = document.querySelector("#data") as HTMLInputElement;
		this._inputQuantidade = document.querySelector(
			"#quantidade",
		) as HTMLInputElement;
		this._inputValor = document.querySelector("#valor") as HTMLInputElement;
	}

	adiciona(): void {
		const negociacao = new Negociacao(
			this._inputData.valueAsDate as Date,
			this._inputQuantidade.valueAsNumber,
			this._inputValor.valueAsNumber,
		);
		this._negociacoes.push(negociacao);
	}

	get quantidade(): number {
		return this._inputQuantidade.valueAsNumber;
	}

	get data(): Date {
		return this._inputData.valueAsDate as Date;
	}

	get valor(): number {
		return this._inputValor.valueAsNumber;
	}

	public mapNegociacao(): object {
		return {
			data: this.data,
			quantidade: this.quantidade,
			valor: this.valor,
		};
	}
}
