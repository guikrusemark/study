import { useState } from "react";
import { useSetRecoilState } from "recoil";

import { listaDeEventosState } from "@/states/atom";
import { obterId } from "@/util";
import type { IEvento } from "../../interfaces/IEvento";

import style from "./Formulario.module.scss";

function Formulario() {
	const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);

	const [descricao, setDescricao] = useState("Testando 1");
	const [dataInicio, setDataInicio] = useState("2024-12-29");
	const [horaInicio, setHoraInicio] = useState("06:00");
	const [dataFim, setDataFim] = useState("2024-12-29");
	const [horaFim, setHoraFim] = useState("07:00");

	function montarData(data: string, hora: string) {
		const dataString = data.slice(0, 10);
		return new Date(`${dataString}T${hora}`);
	}

	function submeterForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const evento: IEvento = {
			id: obterId(),
			descricao,
			inicio: montarData(dataInicio, horaInicio),
			fim: montarData(dataFim, horaFim),
			completo: false,
		};

		setListaDeEventos((prevEventos) => [...prevEventos, evento]);

		setDescricao(`Testando ${evento.id}`);
		// setDataInicio("");
		// setHoraInicio("");
		// setDataFim("");
		// setHoraFim("");
	}

	return (
		<form className={style.Formulario} onSubmit={submeterForm}>
			<h3 className={style.titulo}>Novo evento</h3>

			<label htmlFor="descricao">Descrição</label>
			<input
				type="text"
				name="descricao"
				id="descricao"
				className={style.input}
				onChange={(evento) => setDescricao(evento.target.value)}
				placeholder="Descrição"
				value={descricao}
				autoComplete="off"
				required
			/>

			<label htmlFor="dataInicio">Data de início</label>
			<div className={style.inputContainer}>
				<input
					type="date"
					name="dataInicio"
					className={style.input}
					onChange={(evento) => setDataInicio(evento.target.value)}
					value={dataInicio}
					required
				/>
				<input
					type="time"
					name="horaInicio"
					className={style.input}
					onChange={(evento) => setHoraInicio(evento.target.value)}
					value={horaInicio}
					required
				/>
			</div>

			<label htmlFor="dataFim">Data de término</label>
			<div className={style.inputContainer}>
				<input
					type="date"
					name="dataFim"
					className={style.input}
					onChange={(evento) => setDataFim(evento.target.value)}
					value={dataFim}
					required
				/>
				<input
					type="time"
					name="horaFim"
					className={style.input}
					onChange={(evento) => setHoraFim(evento.target.value)}
					value={horaFim}
					required
				/>
			</div>

			<button type="submit" className={style.botao}>
				Salvar
			</button>
		</form>
	);
}

export default Formulario;
