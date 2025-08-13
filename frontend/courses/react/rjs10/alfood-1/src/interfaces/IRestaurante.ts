import type IPrato from "./IPrato";

export default interface IRestaurante {
	id: number;
	nome: string;
	pratos: IPrato[];
}
