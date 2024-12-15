import home from "../../assets/icons/home.png";
import maisCurtidas from "../../assets/icons/mais-curtidas.png";
import maisVistas from "../../assets/icons/mais-vistas.png";
import novas from "../../assets/icons/novas.png";
import surpreendaMe from "../../assets/icons/surpreenda-me.png";

import styles from "./Menu.module.scss";

function Menu() {
	return (
		<nav className={styles.menu}>
			<ul className={styles.menu__lista}>
				<li className={styles.menu__item}>
					<img src={home} alt="botão home"></img>
					<a href="/">Início</a>
				</li>
				<li className={styles.menu__item}>
					<img src={maisCurtidas} alt="botão home"></img>
					<a href="/">Mais curtidas</a>
				</li>
				<li className={styles.menu__item}>
					<img src={maisVistas} alt="botão home"></img>
					<a href="/">Mais vistas</a>
				</li>
				<li className={styles.menu__item}>
					<img src={novas} alt="botão home"></img>
					<a href="/">Novas</a>
				</li>
				<li className={styles.menu__item}>
					<img src={surpreendaMe} alt="botão home"></img>
					<a href="/">Surpreenda-me</a>
				</li>
			</ul>
		</nav>
	);
}

export default Menu;
