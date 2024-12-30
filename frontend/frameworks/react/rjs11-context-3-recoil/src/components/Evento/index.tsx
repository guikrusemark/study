import { useSetRecoilState } from "recoil";
import type { IEvento } from "../../interfaces/IEvento";
import style from "./Evento.module.scss";
import EventoCheckbox from "./EventoCheckbox";
import { listaDeEventosState } from "@/states/atom";

const Evento: React.FC<{
	evento: IEvento;
}> = ({ evento }) => {
	const estilos = [style.Evento];
	const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);

	if (evento.completo) {
		estilos.push(style.completo);
	}

	function aoDeletarEvento(id: number) {
		setListaDeEventos((prevEventos) =>
			prevEventos.filter((evento) => evento.id !== id),
		);
	}

	// console.log(evento);

	return (
		<div className={estilos.join(" ")}>
			<EventoCheckbox evento={evento} />
			<div className="cards-info">
				<h3 className={style.descricao}>
					{evento.descricao} - {evento.inicio.toLocaleDateString()}
				</h3>
			</div>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<i
				className="far fa-times-circle fa-2x"
				onClick={() => aoDeletarEvento(evento.id)}
			>
				X
			</i>
		</div>
	);
};

export default Evento;
