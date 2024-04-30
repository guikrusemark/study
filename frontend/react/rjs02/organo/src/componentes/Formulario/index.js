import { useState } from "react";
import { v4 as uuid } from "uuid";

import Botao from "../Botao";
import CampoTexto from "../CampoTexto";
import ListaSuspensa from "../ListaSuspensa";

import "./formulario.css";

const Formulario = ({ aoCadastrarColaborador, aoCadastrarTime, times }) => {
	const [nome, setNome] = useState("");
	const [cargo, setCargo] = useState("");
	const [imagem, setImagem] = useState("");
	const [time, setTime] = useState("");

	const [novoTime, setNovoTime] = useState({
		id: uuid(),
		nome: "",
		cor: "#FFFFFF",
	});

	const aoSubmeterColaborador = (evento) => {
		evento.preventDefault();
		console.log("form enviado", nome, cargo, imagem, time);
		aoCadastrarColaborador({
			nome,
			cargo,
			imagem,
			time,
		});
	};
	const aoSubmeterTime = (evento) => {
		evento.preventDefault();
		console.log("form enviado", novoTime);
		aoCadastrarTime(novoTime);
	};

	return (
		<>
			<section className="formulario-container">
				<form className="formulario" onSubmit={aoSubmeterColaborador}>
					<h2>Preencha os dados para criar o card do colaborador.</h2>
					<CampoTexto
						obrigatorio
						label="Nome"
						placeholder="Digite seu nome "
						valor={nome}
						aoAlterado={(valor) => setNome(valor)}
					/>
					<CampoTexto
						obrigatorio
						label="Cargo"
						placeholder="Digite seu cargo "
						valor={cargo}
						aoAlterado={(valor) => setCargo(valor)}
					/>
					<CampoTexto
						label="Imagem"
						placeholder="Informe o endereço da imagem "
						aoAlterado={(valor) => setImagem(valor)}
					/>
					<ListaSuspensa
						obrigatorio
						label="Times"
						items={times}
						valor={time}
						aoAlterado={(valor) => setTime(valor)}
					/>
					<Botao texto="Criar card" />
				</form>
			</section>
			<section className="formulario-container">
				<form
					className="formulario"
					onSubmit={aoSubmeterTime}
					onClick={(event) => setNovoTime({ ...novoTime, id: uuid() })}
				>
					<h2>Preencha os dados para criar um time.</h2>
					<CampoTexto
						obrigatorio
						label="Nome"
						placeholder="Digite o nome do time "
						valor={novoTime.nome}
						aoAlterado={(valor) => setNovoTime({ ...novoTime, nome: valor })}
					/>
					<input
						type="color"
						className="cor-novo-time"
						value={novoTime.cor}
						onChange={(event) =>
							setNovoTime({
								...novoTime,
								id: uuid(),
								cor: event.target.value,
							})
						}
					/>
					<Botao texto="Criar time" />
				</form>
			</section>
		</>
	);
};

export default Formulario;
