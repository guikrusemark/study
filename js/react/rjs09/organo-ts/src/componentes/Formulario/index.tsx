import React from "react";
import { useState } from "react";
import Botao from "../Botao";
import CampoTexto from "../CampoTexto";
import ListaSuspensa from "../ListaSuspensa";
import "./Formulario.css";
import { IColaborador } from "../../common/interfaces/IColaborador";

interface FormularioProps {
  times: Array<string>;
  aoColaboradorCadastrado: (colaborador: IColaborador) => void;
}

const Formulario = ({ times, aoColaboradorCadastrado }: FormularioProps) => {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [imagem, setImagem] = useState("");
  const [time, setTime] = useState("");
  const [data, setData] = useState("");

  const aoSalvar = ( e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    aoColaboradorCadastrado({
      nome,
      cargo,
      imagem,
      time
    });
    setNome("");
    setCargo("");
    setImagem("");
    setTime("");
  };

  return (
    <section className="formulario">
      <form onSubmit={aoSalvar}>
        <h2>Preencha os dados para criar o card do colaborador</h2>
        <CampoTexto
          obrigatorio={true}
          label="Nome"
          placeholder="Digite seu nome"
          valor={nome}
          aoAlterado={valor => setNome(valor)}
        />
        <CampoTexto
          obrigatorio
          label="Cargo"
          placeholder="Digite seu cargo"
          valor={cargo}
          aoAlterado={valor => setCargo(valor)}
        />
        <CampoTexto
          label="Imagem"
          placeholder="Digite o endereço da imagem"
          valor={imagem}
          aoAlterado={valor => setImagem(valor)}
        />
        <CampoTexto
          tipo="date"
          label="Data de Entrada no Time"
          placeholder=""
          valor={data}
          aoAlterado={valor => setData(valor)}
        />
        <ListaSuspensa
          required
          label="Time"
          itens={times}
          valor={time}
          aoAlterado={valor => setTime(valor)}
        />
        <Botao>Criar Card</Botao>
      </form>
    </section>
  );
};

export default Formulario;
