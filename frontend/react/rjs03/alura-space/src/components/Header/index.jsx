import logo from "./logo.png";
import searchIcon from "./search.png";

import styles from "./Header.module.scss";

function Header() {
	return (
		<header className={styles.cabecalho}>
			<img src={logo} alt="logo do alura space" />
			<div className={styles.cabecalho__container}>
				<input
					type="text"
					className={styles.cabecalho__input}
					placeholder="O que você procura?"
				/>
				<img src={searchIcon} alt="ícone de Busca" />
			</div>
		</header>
	);
}

export default Header;
