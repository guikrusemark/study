import React from "react";

import BarraNavegacao from "@/components/BarraNavegacao";
import CarrinhoSuspenso from "@/components/CarrinhoSuspenso";
import Produtos from "@/components/Produtos";

// import Carrossel from "@/components/Carrossel";
// import Categorias from "@/components/Categorias";
// import Facilidades from "@/components/Facilidades";
// import Novidades from "@/components/Novidades";
// import Rodape from "@/components/Rodape";

const Home = () => {
	return (
		<>
			<BarraNavegacao />
			<CarrinhoSuspenso />
			<main>
				{/* <Carrossel /> */}
				{/* <Categorias /> */}
				<Produtos />
			</main>
			{/* <Facilidades />
			<Novidades />
			<Rodape /> */}
		</>
	);
};

export default Home;
