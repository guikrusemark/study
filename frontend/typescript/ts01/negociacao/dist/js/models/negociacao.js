export class Negociacao {
	/** @constructor of Negociacao class
	 * @param {Date} data - Date of the beggining a negotiation
	 * @param {number} quantidade - Quantity of the negotiation
	 * @param {number} valor - Value of the negotiation
	 */
	constructor(data, quantidade, valor) {
		this._data = data;
		this._quantidade = quantidade;
		this._valor = valor;
	}
	get data() {
		return this._data;
	}
	get quantidade() {
		return this._quantidade;
	}
	get valor() {
		return this._valor;
	}
}
