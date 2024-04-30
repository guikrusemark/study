import { BrowserRouter, Route, Switch } from "react-router-dom";

import { CarrinhoProvider } from "common/context/Carrinho";
import { PagamentoProvider } from "common/context/Pagamento";
import { UsuarioProvider } from "common/context/Usuario";

import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";

function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<UsuarioProvider>
					<Route exact path="/">
						<Login />
					</Route>

					<CarrinhoProvider>
						<Route path="/feira">
							<Feira />
						</Route>

						<PagamentoProvider>
							<Route path="/carrinho">
								<Carrinho />
							</Route>
						</PagamentoProvider>
					</CarrinhoProvider>
				</UsuarioProvider>
			</Switch>
		</BrowserRouter>
	);
}

export default Router;
