import { AiFillCloseCircle, AiFillStar, AiOutlineStar } from "react-icons/ai";

import "./colaborador.css";

const Colaborador = ({ colaborador, corDeFundo, aoDeletar, aoFavoritar }) => {
	return (
		<div className="colaborador">
			<div className="cabecalho" style={{ backgroundColor: corDeFundo }}>
				<AiFillCloseCircle size={30} className="deleta" onClick={aoDeletar} />
				<div className="favorito">
					{colaborador.favorito ? (
						<AiFillStar
							size={30}
							className="favoritado"
							onClick={() => aoFavoritar(colaborador.id, false)}
						/>
					) : (
						<AiOutlineStar
							size={30}
							onClick={() => aoFavoritar(colaborador.id, true)}
						/>
					)}
				</div>
				<img src={colaborador.imagem} alt={colaborador.nome} />
			</div>
			<div className="rodape">
				<h4>{colaborador.nome}</h4>
				<h5>{colaborador.cargo}</h5>
			</div>
		</div>
	);
};

export default Colaborador;
