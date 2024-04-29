import Titulo from "@/components/Titulo";
import produtos from "@/mocks/produtos.json";
import React from "react";
import Produto from "./Produto";

const Produtos = ({ adicionarProduto }) => {
	return (
		<section role="produtos" aria-label="Produtos que estão bombando!">
			<Titulo>Produtos que estão bombando!</Titulo>
			<div className="container row mx-auto">
				{produtos.map((produto) => (
					<Produto
						key={produto.id}
						{...produto}
						adicionarProduto={adicionarProduto}
					/>
				))}
			</div>
		</section>
	);
};

export default Produtos;
