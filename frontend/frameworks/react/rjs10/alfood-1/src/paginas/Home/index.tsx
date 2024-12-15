import React from "react";
import { Link } from "react-router-dom";
import Banner from "../../componentes/Banner";
import NavBar from "../../componentes/NavBar";
import Rodape from "../../componentes/Rodape";
import estilos from "./Home.module.scss";

function App() {
	return (
		<>
			<NavBar />
			<Banner />
			<div className={estilos.MiniBanners}>
				<img src="/imagens/cozinhar_01.jpg" alt="Um prato conceitual" />
				<div className={estilos.CardCentral}>
					<h2>A melhor rede de restaurantes!</h2>
					<div>
						<p>seja um parceiro agora:</p>
						<p>
							ligue para <a href="callto:99999999999">(99) 99999-999</a>
						</p>
					</div>
				</div>
				<img src="/imagens/cozinhar_02.jpg" alt="Um hambúrguer desconstruído" />
			</div>
			<div className={estilos.Categorias}>
				<div className={estilos.TipoDePrato}>
					<img src="/imagens/cafedamanha.png" alt="Café da manhã" />
					<h4>Café da manhã</h4>
				</div>
				<div className={estilos.TipoDePrato}>
					<img src="/imagens/almoco.png" alt="Almoço" />
					<h4>Almoço</h4>
				</div>
				<div className={estilos.TipoDePrato}>
					<img src="/imagens/jantar.png" alt="Jantar" />
					<h4>Jantar</h4>
				</div>
				<div className={estilos.TipoDePrato}>
					<img src="/imagens/sobremesa.png" alt="Sobremesas" />
					<h4>Sobremesas</h4>
				</div>
			</div>
			<div className={estilos.Links}>
				<h3>Conheça os melhores restaurantes</h3>
				<p>
					Clique <Link to="/restaurantes">aqui</Link>
				</p>
			</div>
			<Rodape />
		</>
	);
}

export default App;
