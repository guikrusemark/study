import Titulo from "@/components/Titulo";
import categorias from "@/mocks/categorias.json";
import React from "react";
import Categoria from "./Categoria";

const Categorias = () => {
	return (
		<section aria-label="Busque por categoria:">
			<Titulo>Busque por categoria:</Titulo>

			<div className="container row mx-auto mb-5 g-4">
				{categorias.map((categoria) => (
					<Categoria
						key={categoria.id}
						alt={categoria.alt}
						src={categoria.src}
						descricao={categoria.descricao}
					/>
				))}
			</div>
		</section>
	);
};

export default Categorias;
