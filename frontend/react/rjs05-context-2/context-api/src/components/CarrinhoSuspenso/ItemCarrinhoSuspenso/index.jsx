import useCartContext from "@/hooks/useCartContext";

import Botao from "@/components/Botao";
import Quantidade from "@/components/Quantidade";
import ValorFormatado from "@/components/ValorFormatado";

const ItemCarrinhoSuspenso = ({ itemCarrinho }) => {
	const { clearProduct, carrinho, setCarrinho } = useCartContext();

	return (
		<li>
			<div className="produto">
				<img
					className="imagem__produto"
					src={itemCarrinho.src}
					alt={itemCarrinho.alt}
				/>
				<div className="d-flex flex-column gap-3 w-100">
					<p className="fw-semibold fs-5 m-0">{itemCarrinho.titulo}</p>
					<Quantidade itemCarrinho={itemCarrinho} />
					<ValorFormatado
						valor={itemCarrinho.preco * itemCarrinho.quantidade}
					/>
				</div>
				<Botao
					variant="deleteItem"
					aria-label="Excluir"
					onClick={() => clearProduct(itemCarrinho, carrinho, setCarrinho)}
				>
					delete_forever
				</Botao>
			</div>
			<div className="divisor my-5" />
		</li>
	);
};

export default ItemCarrinhoSuspenso;
