import { useLocation } from "react-router-dom";

import ItemCarrinhoSuspenso from "@/components/CarrinhoSuspenso/ItemCarrinhoSuspenso";
import ItemCarrinho from "@/components/ItemCarrinho";

import useCartContext from "@/hooks/useCartContext";

const ListaProdutosCarrinho = () => {
	const location = useLocation();
	const { carrinho } = useCartContext();

	return (
		<ul className="list-unstyled">
			{carrinho.length === 0 ? (
				<p className="text-center my-5">Não há produtos no carrinho</p>
			) : (
				carrinho.map((itemCarrinho) => {
					return location.pathname === "/carrinho" ? (
						<ItemCarrinho key={itemCarrinho.id} itemCarrinho={itemCarrinho} />
					) : (
						<ItemCarrinhoSuspenso
							key={itemCarrinho.id}
							itemCarrinho={itemCarrinho}
						/>
					);
				})
			)}
		</ul>
	);
};

export default ListaProdutosCarrinho;
