import Footer from "components/Footer";
import Gallery from "components/Gallery";
import Header from "components/Header";
import Menu from "components/Menu";
import Popular from "components/Popular";
import banner from "./banner.png";

import styles from "./MainPage.module.scss";

function MainPage() {
	return (
		<>
			<Header />
			<main>
				<section className={styles.principal}>
					<Menu />
					<div className={styles.principal__imagem}>
						<h1>A galeria mais completa do espaço</h1>
						<img src={banner} alt="a imagem da terra vista do espaço" />
					</div>
				</section>
				<section className={styles.principal}>
					<Gallery />
					<Popular />
				</section>
			</main>
			<Footer />
		</>
	);
}

export default MainPage;
