import useCartContext from "@/hooks/useCartContext";

import InfoItemCarrinho from "./InfoItemCarrinho";

import Botao from "@/components/Botao";
import Quantidade from "@/components/Quantidade";
import ValorFormatado from "@/components/ValorFormatado";

const ItemCarrinho = ({ itemCarrinho }) => {
	const { clearProduct, carrinho, setCarrinho } = useCartContext();

	return (
		<li key={itemCarrinho.id}>
			<div className="produto">
				<img
					className="imagem__produto"
					src={itemCarrinho.src}
					alt={itemCarrinho.alt}
				/>
				<InfoItemCarrinho itemCarrinho={itemCarrinho} />
				<ValorFormatado valor={itemCarrinho.preco} />
				<Quantidade itemCarrinho={itemCarrinho} />
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

export default ItemCarrinho;
