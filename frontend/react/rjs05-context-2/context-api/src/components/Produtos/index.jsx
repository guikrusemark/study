import Produto from "./Produto";

import produtos from "@/mocks/produtos.json";

import Titulo from "@/components/Titulo";

const Produtos = () => {
	return (
		<section aria-label="Produtos que estão bombando!">
			<Titulo>Produtos que estão bombando!</Titulo>
			<div className="container row mx-auto">
				{produtos.map((produto) => (
					<Produto key={produto.id} {...produto} />
				))}
			</div>
		</section>
	);
};

export default Produtos;
