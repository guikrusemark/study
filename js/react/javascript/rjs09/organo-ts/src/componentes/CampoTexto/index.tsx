import React from "react";

import "./CampoTexto.css";

interface CampoTextoProps {
  label: string;
  valor: string;
  aoAlterado: (valor: string) => void;
  obrigatorio?: boolean;
  placeholder?: string;
  tipo?: "text" | "date" | "number" | "email" | "password",
}

const CampoTexto = ({ label, valor, aoAlterado, placeholder, obrigatorio = false, tipo = "text" }: CampoTextoProps) => {
  const placeholderModificada = `${placeholder}...`;

  const aoDigitado = (e: React.ChangeEvent<HTMLInputElement>) => {
    aoAlterado(e.target.value);
  };

  return (
    <div className="campo-texto">
      <label>{label}</label>
      <input
        type={tipo}
        value={valor}
        onChange={aoDigitado}
        required={obrigatorio}
        placeholder={placeholderModificada}
      />
    </div>
  );
};

export default CampoTexto;
