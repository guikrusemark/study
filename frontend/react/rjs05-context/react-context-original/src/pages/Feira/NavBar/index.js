import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { ReactComponent as Logo } from "assets/logo.svg";
import { useCarrinhoContext } from "common/contexts/Carrinho";
import { useHistory } from "react-router-dom";
import { Nav } from "./styles";

export default function NavBar() {
	const { quantidadeCarrinho } = useCarrinhoContext();
	const history = useHistory();
	return (
		<Nav>
			<Logo />
			<IconButton
				onClick={() => history.push("/carrinho")}
				disabled={quantidadeCarrinho === 0}
			>
				<Badge badgeContent={quantidadeCarrinho} color="primary">
					<ShoppingCartIcon />
				</Badge>
			</IconButton>
		</Nav>
	);
}
