import CarrinhoProvider from "common/contexts/Carrinho";
import { PagamentoProvider } from "common/contexts/Pagamento";
import UsuarioProvider from "common/contexts/Usuario";
import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

export default function Routes() {
	return (
		<Router>
			<Switch>
				<PagamentoProvider>
					<UsuarioProvider>
						<Route exact path="/">
							<Login />
						</Route>
						<CarrinhoProvider>
							<Route path="/feira">
								<Feira />
							</Route>
							<Route path="/carrinho">
								<Carrinho />
							</Route>
						</CarrinhoProvider>
					</UsuarioProvider>
				</PagamentoProvider>
			</Switch>
		</Router>
	);
}
