export class Negociacao {
	vezes: number;
	montante: number;
	constructor(
		private _data: Date,
		public readonly quantidade: number,
		public readonly valor: number,
	) {}

	get volume(): number {
		return this.quantidade * this.valor;
	}

	get data(): Date {
		const data = new Date(this._data.getTime());
		return data;
	}

	public static criaDe(data: string, qtd: string, valor: string): Negociacao {
		const exp = /-/g;
		const _data = new Date(data.replace(exp, ","));
		const _qtd = Number.parseInt(qtd);
		const _valor = Number.parseFloat(valor);

		return new Negociacao(_data, _qtd, _valor);
	}

	public ehIgual(negociacao: Negociacao): boolean {
		return (
			this.data.getDate() === negociacao.data.getDate() &&
			this.data.getMonth() === negociacao.data.getMonth() &&
			this.data.getFullYear() === negociacao.data.getFullYear()
		);
	}
}
