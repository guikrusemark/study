import { BrowserRouter, Switch, Route } from "react-router-dom";

import { UsuarioProvider } from "common/context/Usuario";
import { CarrinhoProvider } from "common/context/Carrinho";
import { PagamentoProvider } from "common/context/Pagamento";

import Login from "pages/Login";
import Feira from "pages/Feira";
import Carrinho from "pages/Carrinho";

function Router() {

  return (
    <BrowserRouter>
      <Switch>
        <UsuarioProvider >
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

