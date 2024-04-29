import React from "react";

import BarraNavegacao from "@/components/BarraNavegacao";
import CarrinhoSuspenso from "@/components/CarrinhoSuspenso";
import Carrossel from "@/components/Carrossel";
import Categorias from "@/components/Categorias";
import Facilidades from "@/components/Facilidades";
import Novidades from "@/components/Novidades";
import Produtos from "@/components/Produtos";
import Rodape from "@/components/Rodape";

const Home = ({
  carrinho,
  adicionarProduto,
  removerProduto,
  removerProdutoCarrinho,
  valorTotalCarrinho,
  quantidadeProdutos,
}) => {
  return (
    <>
      <BarraNavegacao quantidadeProdutos={ quantidadeProdutos } />
      <CarrinhoSuspenso
        carrinho={ carrinho }
        adicionarProduto={ adicionarProduto }
        removerProduto={ removerProduto }
        removerProdutoCarrinho={ removerProdutoCarrinho }
        valorTotalCarrinho={ valorTotalCarrinho }
      />
      <main>
        <Carrossel />
        <Categorias />
        <Produtos adicionarProduto={ adicionarProduto } />
        <Facilidades />
        <Novidades />
      </main>
      <Rodape />
    </>
  );
};

export default Home;
