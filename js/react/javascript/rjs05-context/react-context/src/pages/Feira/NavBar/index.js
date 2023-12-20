import { Nav } from './styles';
import { ReactComponent as Logo } from 'assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

import { useCarrinhoContext } from "common/context/Carrinho";
import { useHistory } from "react-router-dom";

export default function NavBar() {
  const history = useHistory();
  const { quantidadeTotal } = useCarrinhoContext();
  return (
    <Nav>
      <Logo />
      <IconButton
        disabled={ quantidadeTotal === 0 }
        onClick={ () => history.push("/carrinho") }
      >
        <Badge
          badgeContent={ quantidadeTotal }
          color="primary"
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  )
}
