import React from "react";
import type { IColaborador } from "../../common/interfaces/IColaborador";
import Colaborador from "../Colaborador";
import "./Time.css";

interface TimeProps {
	corPrimaria: string;
	corSecundaria: string;
	nome: string;
	colaboradores: IColaborador[];
}

const Time = ({
	corPrimaria,
	corSecundaria,
	nome,
	colaboradores,
}: TimeProps) => {
	const css = { backgroundColor: corSecundaria };

	return colaboradores.length > 0 ? (
		<section className="time" style={css}>
			<h3 style={{ borderColor: corPrimaria }}>{nome}</h3>
			<div className="colaboradores">
				{colaboradores.map((colaborador) => (
					<Colaborador
						corDeFundo={corPrimaria}
						key={colaborador.nome}
						nome={colaborador.nome}
						cargo={colaborador.cargo}
						imagem={colaborador.imagem}
					/>
				))}
			</div>
		</section>
	) : (
		<></>
	);
};

export default Time;
