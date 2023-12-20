import React from "react";
import "./ListaSuspensa.css";

interface ListaSuspensaProps {
  label: string;
  itens: Array<string>;
  aoAlterado: (valor: string) => void;
  required?: boolean;
  valor: string;
}

const ListaSuspensa = ({
  label,
  itens,
  aoAlterado,
  valor,
  required = false
}: ListaSuspensaProps) => {
  return (
    <div className="lista-suspensa">
      <label>{label}</label>
      <select
        onChange={evento => aoAlterado(evento.target.value)}
        required={required}
        value={valor}
      >
        <option value=""></option>
        {itens.map(item => {
          return <option key={item}>{item}</option>;
        })}
      </select>
    </div>
  );
};

export default ListaSuspensa;
