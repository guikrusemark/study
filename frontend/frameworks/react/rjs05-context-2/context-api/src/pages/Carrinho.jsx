import BannerCarrinho from "@/components/BannerCarrinho";
import BarraNavegacao from "@/components/BarraNavegacao";
import ListaProdutosCarrinho from "@/components/ListaProdutosCarrinho";
import Sumario from "@/components/Sumario";
import Titulo from "@/components/Titulo";
import React from "react";

const Carrinho = () => {
	return (
		<>
			<BarraNavegacao />
			<BannerCarrinho />
			<main className="container-xxl">
				<Titulo element="h1" className="text-center fw-semibold my-3 my-md-5">
					Carrinho de Compras
				</Titulo>
				<section className="secao__compra text-light mx-md-4 mx-xl-4">
					<div className="conteudo mb-5">
						<div className="detalhe__compra bg-black p-4">
							<Titulo className="text-center fw-bold mb-3 text-md-start">
								Detalhes da compra
							</Titulo>
							<ListaProdutosCarrinho />
						</div>
						<Sumario />
					</div>
				</section>
			</main>
		</>
	);
};

export default Carrinho;
