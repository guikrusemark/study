export class Negociacao {
	private _data: Date;
	private _quantidade: number;
	private _valor: number;

	/** @constructor of Negociacao class
	 * @param {Date} data - Date of the beggining a negotiation
	 * @param {number} quantidade - Quantity of the negotiation
	 * @param {number} valor - Value of the negotiation
	 */
	constructor(data: Date, quantidade: number, valor: number) {
		this._data = data;
		this._quantidade = quantidade;
		this._valor = valor;
	}

	get data(): Date {
		return this._data;
	}

	get quantidade(): number {
		return this._quantidade;
	}

	get valor(): number {
		return this._valor;
	}
}
