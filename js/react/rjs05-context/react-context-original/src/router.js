import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from 'pages/Login';
import Feira from 'pages/Feira';
import UsuarioProvider from 'common/contexts/Usuario';
import CarrinhoProvider from 'common/contexts/Carrinho';
import Carrinho from 'pages/Carrinho';
import { PagamentoProvider } from 'common/contexts/Pagamento';

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
  )
};