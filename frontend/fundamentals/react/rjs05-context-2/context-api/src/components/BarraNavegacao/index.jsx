import { useLocation } from "react-router-dom";

import Botao from "@/components/Botao";
import CampoTexto from "@/components/CampoTexto";

import BotaoCarrinho from "./BotaoCarrinho";
import BotaoTogglerMenu from "./BotaoTogglerMenu";
import Logo from "./Logo";
import Menu from "./Menu";

const BarraNavegacao = () => {
	const location = useLocation();
	const ehAPaginaCarrinho = location.pathname === "/carrinho";
	return (
		<header>
			<nav className="navbar navbar-expand-md bg-black navbar-dark">
				<div className="container-fluid custom-margin">
					<Logo />
					<div className="d-flex flex-row-reverse">
						<BotaoTogglerMenu />
						<BotaoCarrinho
							className={`d-md-none ${ehAPaginaCarrinho && "d-none"}`}
						/>
					</div>
					<div className="collapse navbar-collapse" id="conteudoBarraNavegacao">
						<Menu />
						<form className="d-flex" role="search">
							<CampoTexto
								className="me-2"
								type="search"
								placeholder="Digite o nome do produto"
								aria-label="Pesquisar"
							/>
							<Botao type="submit">Pesquisar</Botao>
						</form>
						<BotaoCarrinho
							className={`d-none d-md-block ${
								ehAPaginaCarrinho && "d-md-none"
							}`}
						/>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default BarraNavegacao;
