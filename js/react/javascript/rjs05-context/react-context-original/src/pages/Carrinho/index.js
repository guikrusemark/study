import { Button, MenuItem, Select, Snackbar, InputLabel } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useCarrinhoContext } from 'common/contexts/Carrinho';
import Produto from 'components/Produto';
import { useContext, useMemo, useState } from 'react';
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';
import { useHistory } from 'react-router-dom';
import { UsuarioContext } from 'common/contexts/Usuario';
import { usePagamento } from 'common/contexts/Pagamento';

function Carrinho() {
  const { 
    carrinho,
    quantidadeCarrinho,
    comprar,
    valorTotal = 0
  } = useCarrinhoContext();
  const { saldo = 0 } = useContext(UsuarioContext);
  const {
    formaPagamento,
    mudarFormaPagamento,
    tiposPagamento
  } = usePagamento();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const history = useHistory();
  const total = useMemo(() => saldo - valorTotal, [saldo, valorTotal]);
  return (
    <Container>
      <Voltar onClick={history.goBack} />
      <h2>
        Carrinho
      </h2>
      {carrinho.map((produto) => (
        <Produto 
          {...produto}
          key={produto.id}
        />
      ))}
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select 
          value={formaPagamento.id}
          onChange={(event) => mudarFormaPagamento(event.target.value)}
        >
          {tiposPagamento.map(pagamento => (
            <MenuItem
              value={pagamento.id}
              key={pagamento.id}
            >
              {pagamento.nome}
            </MenuItem>
          ))}
        </Select>
      </PagamentoContainer>
      <TotalContainer>
          <div>
            <h2>Total no Carrinho: </h2>
            <span>R$ {valorTotal.toFixed(2)}</span>
          </div>
          <div>
            <h2> Saldo: </h2>
            <span> R$ {saldo.toFixed(2)} </span>
          </div>
          <div>
            <h2> Saldo Total: </h2>
            <span> R$ {total.toFixed(2)} </span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {
          comprar();
          setOpenSnackbar(true);
        }}
        disabled={quantidadeCarrinho === 0 || total < 0}
        color="primary"
        variant="contained"
      >
         Comprar
       </Button>
        <Snackbar
          anchorOrigin={
            { 
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
           <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Compra feita com sucesso!
          </MuiAlert>
        </Snackbar>
    </Container>
  )
}

export default Carrinho;