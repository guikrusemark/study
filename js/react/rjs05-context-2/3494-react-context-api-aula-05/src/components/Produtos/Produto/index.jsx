import React from "react";
import Botao from "@/components/Botao";
import { formatadorMoeda } from "@/utils/formatadorMoeda";

const Produto = ({
  src,
  id,
  alt,
  titulo,
  descricao,
  preco,
  adicionarProduto,
}) => {
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
            handleClick={() =>
              adicionarProduto({ src, alt, id, titulo, descricao, preco })
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
