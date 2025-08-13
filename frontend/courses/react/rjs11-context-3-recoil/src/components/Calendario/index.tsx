import type React from "react";

import Kalend, { CalendarView } from "kalend";
import { useRecoilValue } from "recoil";

import { listaDeEventosState } from "@/states/atom";

import ptBR from "./localizacao/ptBR.json";

import "kalend/dist/styles/index.css";
import style from "./Calendario.module.scss";

interface IKalendEvento {
	id?: number;
	startAt: string;
	endAt: string;
	summary: string;
	color: string;
}

const Calendario: React.FC = () => {
	const eventosKalend = new Map<string, IKalendEvento[]>();
	const eventos = useRecoilValue(listaDeEventosState);

	for (const evento of eventos) {
		const chave = evento.id.toString();

		if (!eventosKalend.has(chave)) {
			eventosKalend.set(chave, []);
		}

		eventosKalend.get(chave)?.push({
			id: evento.id,
			startAt: evento.inicio.toISOString(),
			endAt: evento.fim.toISOString(),
			summary: evento.descricao,
			color: "blue",
		});
	}

	return (
		<div className={style.Container}>
			<Kalend
				events={Object.fromEntries(eventosKalend)}
				initialDate={new Date().toISOString()}
				hourHeight={60}
				initialView={CalendarView.WEEK}
				timeFormat={"24"}
				weekDayStart={"Monday"}
				calendarIDsHidden={["work"]}
				language={"customLanguage"}
				customLanguage={ptBR}
			/>
		</div>
	);
};

export default Calendario;
