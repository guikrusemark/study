import { useRecoilValue } from "recoil";

import { listaDeEventosState } from "@/states/atom";

import type { IEvento } from "@/interfaces/IEvento";

import Evento from "../Evento";
import Filtro from "../Filtro";

import style from "./ListaDeEventos.module.scss";
import { useState } from "react";

function isSameDay(date1: Date, date2: Date): boolean {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
}

function ListaDeEventos() {
	const eventos = useRecoilValue<IEvento[]>(listaDeEventosState);
	const [filtroData, setFiltroData] = useState<string>("");

	const obterEventosFiltrados = () =>
		eventos.filter((evento) => {
			if (filtroData === "") {
				return true;
			}

			const data = new Date(filtroData);
			data.setDate(data.getDate() + 1);
			const inicio = new Date(evento.inicio);
			const fim = new Date(evento.fim);

			return isSameDay(data, inicio) || isSameDay(data, fim);
		});

	return (
		<section>
			<Filtro filtroData={filtroData} setFiltroData={setFiltroData} />
			<div className={style.Scroll}>
				{obterEventosFiltrados().map((evento) => (
					<Evento evento={evento} key={evento.id} />
				))}
			</div>
		</section>
	);
}

export default ListaDeEventos;
