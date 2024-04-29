import React from "react";
import Botao from "@/components/Botao";
import ListaProdutosCarrinho from "@/components/ListaProdutosCarrinho";
import TotalCarrinho from "./TotalCarrinho";
import Titulo from "@/components/Titulo";

const CarrinhoSuspenso = ({
  carrinho,
  adicionarProduto,
  removerProduto,
  removerProdutoCarrinho,
  valorTotalCarrinho,
}) => {
  return (
    <div
      className="offcanvas offcanvas-end text-bg-dark"
      tabIndex="-1"
      id="modalCarrinhoSuspenso"
      aria-labelledby="modalCarrinhoSuspensoLabel"
    >
      <div className="offcanvas-header botao-lilas">
        <Titulo
          element="h5"
          className="offcanvas-title"
          id="modalCarrinhoSuspensoLabel"
        >
          Carrinho
        </Titulo>
        <Botao
          variant="close"
          type="button"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></Botao>
      </div>
      <div className="offcanvas-body">
        <ListaProdutosCarrinho
          carrinho={carrinho}
          adicionarProduto={adicionarProduto}
          removerProduto={removerProduto}
          removerProdutoCarrinho={removerProdutoCarrinho}
        />
        <TotalCarrinho valorTotalCarrinho={valorTotalCarrinho} />
      </div>
    </div>
  );
};

export default CarrinhoSuspenso;
