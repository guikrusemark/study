import type IPrato from "../../../interfaces/IPrato";
import estilos from "./Prato.module.scss";

interface PratoProps {
	prato: IPrato;
}

const Prato = ({ prato }: PratoProps) => {
	return (
		<div className={estilos.Prato}>
			<div className={estilos.Container}>
				<div>
					<div className={estilos.EfeitoTorcao}>
						<img src={prato.imagem} alt={prato.descricao} />
					</div>
				</div>
			</div>
			<div className={estilos.Conteudo}>
				<h3>{prato.nome}</h3>
				<div className={estilos.Tag}>{prato.tag}</div>
				<div>{prato.descricao}</div>
			</div>
		</div>
	);
};

export default Prato;
