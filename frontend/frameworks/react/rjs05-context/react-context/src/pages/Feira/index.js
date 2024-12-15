import { useContext } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import { Container, Header, Lista } from "./styles";

import { Button } from "@material-ui/core";
import Produto from "components/Produto";
import NavBar from "./NavBar";

import feira from "./feira.json";

import { useCarrinhoContext } from "common/context/Carrinho";
import { UsuarioContext } from "common/context/Usuario";

const ButtonNav = styled(Button)`
  margin-right: 10px;
`;

function Feira() {
	const history = useHistory();
	const { quantidadeTotal } = useCarrinhoContext();
	const { nome, saldo } = useContext(UsuarioContext);

	return (
		<Container>
			<NavBar />
			<Header>
				<div>
					<h2> Olá, {nome}!</h2>
					<h3> Saldo: R$ {saldo.toFixed(2).toString().replace(/\./g, ",")}</h3>
				</div>
				<p>Encontre os melhores produtos orgânicos!</p>
			</Header>
			<Lista>
				<h2>Produtos:</h2>
				{feira.map((produto) => (
					<Produto {...produto} key={produto.id} />
				))}
			</Lista>
			<ButtonNav
				variant="contained"
				color="primary"
				onClick={() => history.push("/")}
			>
				Refazer Login
			</ButtonNav>
			<ButtonNav
				disabled={quantidadeTotal === 0}
				variant="contained"
				color="primary"
				onClick={() => history.push("/carrinho")}
			>
				Fechar Compra
			</ButtonNav>
		</Container>
	);
}

export default Feira;
