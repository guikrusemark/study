import React from "react";
import Titulo from "@/components/Titulo";
import Facilidade from "./Facilidade";
import facilidades from "@/mocks/facilidades.json";

const Facilidades = () => {
  return (
    <section
      className="pb-4 bg-black text-bg-dark"
      role="facilidades"
      aria-label="Conheça todas as nossas facilidades"
    >
      <Titulo classes="text-center pt-5 pb-3">
        Conheça todas as nossas facilidades
      </Titulo>
      <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center gap-3 px-3  pt-3 pb-3">
        {facilidades.map((facilidade) => {
          return <Facilidade key={facilidade.id} {...facilidade} />;
        })}
      </div>
    </section>
  );
};

export default Facilidades;
