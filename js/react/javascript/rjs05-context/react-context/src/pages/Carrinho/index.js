import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useContext, useMemo, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Voltar, TotalContainer, PagamentoContainer } from './styles';

import { UsuarioContext } from "common/context/Usuario";
import { useCarrinhoContext } from 'common/context/Carrinho';
import { usePagamentoContext } from 'common/context/Pagamento';

function Carrinho() {
  const { saldo, setSaldo } = useContext(UsuarioContext);
  const { quantidadeTotal, total } = useCarrinhoContext();
  const { tiposPagamento, formaPagamento, mudarFormaPagamento } = usePagamentoContext();


  const history = useHistory();
  if (quantidadeTotal === 0)
    history.push("/feira");

  const juros = useMemo(() => total * (formaPagamento.juros - 1), [ total, formaPagamento.juros ]);
  const saldoFinal = useMemo(() => saldo - (total + juros), [ saldo, total, juros ]);

  const saldoEmReal = saldo.toFixed(2).toString().replace(/\./g, ",");
  const totalEmReal = total.toFixed(2).toString().replace(/\./g, ",");
  const jurosEmReal = juros.toFixed(2).toString().replace(/\./g, ",");
  const saldoFinalEmReal = saldoFinal.toFixed(2).toString().replace(/\./g, ",");

  const [ openSnackbar, setOpenSnackbar ] = useState(false);

  return (
    <Container>
      <Voltar onClick={ () => history.goBack() } />
      <h2>
        Carrinho
      </h2>
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select
          value={ formaPagamento.id }
          onChange={ (e) => mudarFormaPagamento(e.target.value) }
        >
          { tiposPagamento.map(tipo => (
            <MenuItem
              key={ tipo.id }
              value={ tipo.id }
            >
              { tipo.nome }
            </MenuItem>
          )) }
        </Select>
      </PagamentoContainer>
      <TotalContainer>
        <div>
          <h2> Saldo Anterior: </h2>
          <span> R$ { saldoEmReal }</span>
        </div>
        <div>
          <h2>Total Carrinho: </h2>
          <span>R$ { totalEmReal }</span>
        </div>
        <div>
          <h2>Total Juros: </h2>
          <span>R$ { jurosEmReal }</span>
        </div>
        <div>
          <h2> Saldo Final: </h2>
          <span> R$ { saldoFinalEmReal }</span>
        </div>
      </TotalContainer>

      <Button
        disabled={ saldoFinal < 0 || saldo === 0 }
        onClick={ () => {
          setOpenSnackbar(true);
          setSaldo(saldoFinal);
        } }
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
        open={ openSnackbar }
        onClose={ () => setOpenSnackbar(false) }
      >
        <MuiAlert
          onClose={ () => setOpenSnackbar(false) }
          severity="success"
        >
          Compra feita com sucesso!
        </MuiAlert>
      </Snackbar>
    </Container>
  )
}

export default Carrinho;
