import React from "react";
import Categoria from "./Categoria";
import categorias from "@/mocks/categorias.json";
import Titulo from "@/components/Titulo";

const Categorias = () => {
  return (
    <section role="categorias" aria-label="Busque por categoria:">
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
