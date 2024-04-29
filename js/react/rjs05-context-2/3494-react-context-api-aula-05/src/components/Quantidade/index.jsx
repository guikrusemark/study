import React from "react";
import Botao from "@/components/Botao";
import Titulo from "@/components/Titulo";
import { useLocation } from "react-router-dom";

const Quantidade = ({ itemCarrinho, adicionarProduto, removerProduto }) => {
  const location = useLocation();

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
          handleClick={() => removerProduto(itemCarrinho.id)}
        >
          -
        </Botao>
        <span className="border px-4 rounded" aria-label="Quantidade">
          {itemCarrinho.quantidade || 0}
        </span>
        <Botao
          variant="addItem"
          aria-label="Adicionar item"
          handleClick={() => adicionarProduto(itemCarrinho)}
        >
          +
        </Botao>
      </div>
    </div>
  );
};

export default Quantidade;
