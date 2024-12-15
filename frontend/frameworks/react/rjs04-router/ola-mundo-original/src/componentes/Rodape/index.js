import { ReactComponent as MarcaRegistrada } from "assets/marca_registrada.svg";
import styles from "./Rodape.module.css";

export default function Rodape() {
	return (
		<footer className={styles.rodape}>
			<MarcaRegistrada />
			Desenvolvido por Alura.
		</footer>
	);
}
