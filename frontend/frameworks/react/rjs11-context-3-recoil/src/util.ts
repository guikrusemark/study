
import type { IEvento } from "./interfaces/IEvento";

let id = 2;

export function obterId(): number {
	return id++;
}

export let eventosFiltradosRes: IEvento[];

export const setEventosFiltrados = (eventos: IEvento[]) => {
	eventosFiltradosRes = eventos;
}

