import React from "react";
import CampoTexto from "@/components/CampoTexto";
import Botao from "@/components/Botao";
import Titulo from "@/components/Titulo";

const Novidades = () => {
  return (
    <section
      role="Novidades"
      aria-label="Receba as novidades, promoções exclusivas e 10% OFF na primeira compra"
    >
      <form className="container border border-secondary my-3 my-xl-5 p-3 text-center div-novidades mx-auto">
        <Titulo element="h4">
          Quer receber nossas novidades, promoções exclusivas e 10% OFF na
          primeira compra? Cadastre-se!
        </Titulo>

        <div className="input-group my-3">
          <CampoTexto
            type="email"
            className="border-secondary"
            placeholder="Digite seu e-mail"
            aria-label="Digite seu e-mail"
            aria-describedby="button-addon2"
          />
          <Botao
            variant="primary"
            className="border-0"
            type="button"
            id="button-addon2"
          >
            Enviar
          </Botao>
        </div>
      </form>
    </section>
  );
};

export default Novidades;
