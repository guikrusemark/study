import type { IEvento } from "@/interfaces/IEvento";
import { atom } from "recoil";

export const listaDeEventosState = atom<IEvento[]>({
	key: "listaDeEventosState",
	default: [
		{
			id: 0,
			descricao: "Estudar React",
			inicio: new Date("2024-12-24T06:00"),
			fim: new Date("2024-12-24T13:00"),
			completo: false,
		},
		{
			id: 1,
			descricao: "Estudar Recoil",
			inicio: new Date("2024-12-25T09:00"),
			fim: new Date("2024-12-25T11:00"),
			completo: false,
		},
	],
});
