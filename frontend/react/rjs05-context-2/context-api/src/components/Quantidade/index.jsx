import { useLocation } from "react-router-dom";

import useCartContext from "@/hooks/useCartContext";

import Botao from "@/components/Botao";
import Titulo from "@/components/Titulo";

const Quantidade = ({ itemCarrinho }) => {
	const location = useLocation();
	const { addProduct, removeProduct, carrinho, setCarrinho } = useCartContext();

	return (
		<div
			className={`d-flex flex-column align-items-center ${
				location.pathname === "/carrinho"
					? "align-items-md-center"
					: "align-items-md-start"
			} gap-3`}
		>
			<Titulo element="h5" className="m-0 fs-6">
				Quantidade
			</Titulo>
			<div className="d-flex flex-row justify-content-between gap-3">
				<Botao
					variant="removeItem"
					aria-label="Remover item"
					onClick={() => removeProduct(itemCarrinho, carrinho, setCarrinho)}
				>
					-
				</Botao>
				<span className="border px-4 rounded" aria-label="Quantidade">
					{itemCarrinho.quantidade || 0}
				</span>
				<Botao
					variant="addItem"
					aria-label="Adicionar item"
					onClick={() => addProduct(itemCarrinho, carrinho, setCarrinho)}
				>
					+
				</Botao>
			</div>
		</div>
	);
};

export default Quantidade;
