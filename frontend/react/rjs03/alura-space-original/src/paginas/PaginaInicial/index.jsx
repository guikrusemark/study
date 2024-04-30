import styles from "./PaginaInicial.module.scss";
import banner from "./banner.png";

import Cabecalho from "componentes/Cabecalho";
import Galeria from "componentes/Galeria";
import Menu from "componentes/Menu";
import Populares from "componentes/Populares";
import Rodape from "componentes/Rodape";

export default function PaginaInicial() {
	return (
		<>
			<Cabecalho />
			<main>
				<section className={styles.principal}>
					<Menu />
					<div className={styles.principal__imagem}>
						<h1>A galeria mais completa do espaço</h1>
						<img src={banner} alt="A imagem da terra vista do espaço" />
					</div>
				</section>
				<div className={styles.galeria}>
					<Galeria />
					<Populares />
				</div>
			</main>
			<Rodape />
		</>
	);
}
