import React from "react";
import { formatadorMoeda } from "@/utils/formatadorMoeda";

const ValorFormatado = ({ valor }) => {
  return (
    <span
      className="verde-limao text-center text-md-start fw-bold fs-5"
      aria-label="Valor do produto"
    >
      {formatadorMoeda(valor)}
    </span>
  );
};

export default ValorFormatado;
