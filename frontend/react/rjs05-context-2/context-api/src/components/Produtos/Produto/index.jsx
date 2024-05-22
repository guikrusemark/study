import Botao from "@/components/Botao";

import useCartContext from "@/hooks/useCartContext";

import { formatadorMoeda } from "@/utils/formatadorMoeda";

const Produto = ({ src, id, alt, titulo, descricao, preco }) => {
	const { addProduct, carrinho, setCarrinho } = useCartContext();

	return (
		<div className="col-12 col-md-6 col-xxl-4 pb-4">
			<div className="card">
				<img className="img-fluid" src={src} alt={alt} />
				<div className="card-body">
					<h5 className="card-title fw-bold">{titulo}</h5>
					<p className="card-text">{descricao}</p>
					<p className="fw-bold">{formatadorMoeda(preco)}</p>

					<Botao
						variant="primary"
						type="button"
						className="border-0"
						onClick={() =>
							addProduct(
								{ src, alt, id, titulo, descricao, preco },
								carrinho,
								setCarrinho,
							)
						}
					>
						Adicionar ao carrinho
					</Botao>
				</div>
			</div>
		</div>
	);
};

export default Produto;
