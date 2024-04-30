import hexToRgba from "hex-to-rgba";
import Colaborador from "../Colaborador";

import "./time.css";

const Time = ({ time, colaboradores, aoDeletar, aoMudarCor, aoFavoritar }) => {
	return (
		colaboradores.length > 0 && (
			<section
				className="time"
				style={{ backgroundColor: hexToRgba(time.cor, "0.25") }}
			>
				<input
					type="color"
					className="cor"
					value={time.cor}
					onChange={(e) => aoMudarCor(time.id, e.target.value)}
				/>

				<h3 style={{ borderColor: time.cor }}>{time.nome}</h3>
				<div className="colaboradores">
					{colaboradores.map((colaborador) => (
						<Colaborador
							key={colaborador.id}
							colaborador={colaborador}
							corDeFundo={time.cor}
							aoDeletar={() => aoDeletar(colaborador.id, colaborador.time)}
							aoFavoritar={aoFavoritar}
						/>
					))}
				</div>
			</section>
		)
	);
};

export default Time;
