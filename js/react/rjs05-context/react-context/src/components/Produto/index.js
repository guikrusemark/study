import { memo } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { Container } from './styles';
import { useCarrinhoContext } from 'common/context/Carrinho';

function Produto({ nome, foto, id, valor }) {
  const { quantidade, toggleProduto } = useCarrinhoContext(id);

  const valorEmReal = valor?.toFixed(2).toString().replace(/\./g, ",");


  return (
    <Container>
      <div>
        <img
          src={ `/assets/${ foto }.png` }
          alt={ `foto de ${ nome }` }
        />
        <p>
          { nome } - R$ { valorEmReal } <span>/Kg</span>
        </p>
      </div>
      <div>

        <IconButton color="secondary"
          disabled={ quantidade === 0 }
          onClick={ () => toggleProduto(-1, { nome, foto, id, valor, quantidade }) }
        >
          <RemoveIcon />
        </IconButton>

        <span>{ quantidade }</span>

        <IconButton color="primary"
          onClick={ () => toggleProduto(+1, { nome, foto, id, valor, quantidade }) }>
          <AddIcon />
        </IconButton>

      </div>
    </Container>
  )
}

export default memo(Produto)
