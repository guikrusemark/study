import React from "react";
import ItemCarrinhoSuspenso from "@/components/CarrinhoSuspenso/ItemCarrinhoSuspenso";
import ItemCarrinho from "@/components/ItemCarrinho";
import { useLocation } from "react-router-dom";

const ListaProdutosCarrinho = ({
  carrinho,
  adicionarProduto,
  removerProduto,
  removerProdutoCarrinho,
}) => {
  const location = useLocation();
  return (
    <ul className="list-unstyled">
      {carrinho.length === 0 ? (
        <p className="text-center my-5">Não há produtos no carrinho</p>
      ) : (
        carrinho.map((itemCarrinho) => {
          return location.pathname === "/carrinho" ? (
            <ItemCarrinho
              key={itemCarrinho.id}
              itemCarrinho={itemCarrinho}
              adicionarProduto={adicionarProduto}
              removerProduto={removerProduto}
              removerProdutoCarrinho={removerProdutoCarrinho}
            />
          ) : (
            <ItemCarrinhoSuspenso
              key={itemCarrinho.id}
              itemCarrinho={itemCarrinho}
              adicionarProduto={adicionarProduto}
              removerProduto={removerProduto}
              removerProdutoCarrinho={removerProdutoCarrinho}
            />
          );
        })
      )}
    </ul>
  );
};

export default ListaProdutosCarrinho;
