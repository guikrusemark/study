export class Negociacao {
    constructor(_data, quantidade, valor) {
        this._data = _data;
        this.quantidade = quantidade;
        this.valor = valor;
    }
    get volume() {
        return this.quantidade * this.valor;
    }
    get data() {
        const data = new Date(this._data.getTime());
        return data;
    }
    static criaDe(data, qtd, valor) {
        const exp = /-/g;
        const _data = new Date(data.replace(exp, ","));
        const _qtd = Number.parseInt(qtd);
        const _valor = Number.parseFloat(valor);
        return new Negociacao(_data, _qtd, _valor);
    }
    ehIgual(negociacao) {
        return (this.data.getDate() === negociacao.data.getDate() &&
            this.data.getMonth() === negociacao.data.getMonth() &&
            this.data.getFullYear() === negociacao.data.getFullYear());
    }
}
