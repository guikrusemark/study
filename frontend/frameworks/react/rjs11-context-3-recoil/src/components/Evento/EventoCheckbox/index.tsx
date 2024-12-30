import { useRecoilValue, useSetRecoilState } from "recoil";

import { listaDeEventosState } from "@/states/atom";

import type { IEvento } from "../../../interfaces/IEvento";

const EventoCheckbox: React.FC<{
	evento: IEvento;
}> = ({ evento }) => {
	let eventos = useRecoilValue<IEvento[]>(listaDeEventosState);
	const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);

	function aoAlterarStatus(evento: IEvento) {
		if (evento) {
			eventos = eventos.map((e) =>
				e.id === evento.id ? { ...e, completo: !e.completo } : e,
			);
		}
		setListaDeEventos(eventos);
	}

	// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
	return <i onClick={() => aoAlterarStatus(evento)}>O</i>;
};

export default EventoCheckbox;
