import React, { useState } from 'react';
import { IEvento } from '../../interfaces/IEvento';
import style from './Formulario.module.scss';

const Formulario: React.FC<{ aoSalvar: (evento: IEvento) => void }> = ({ aoSalvar }) => {
  const [descricao, setDescricao] = useState('')
  const [dataInicio, setDataInicio] = useState('')
  const [horaInicio, setHoraInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [horaFim, setHoraFim] = useState('')

  const montarData = (data:string, hora: string) => {
    const dataString = data.slice(0, 10)
    return new Date(`${dataString}T${hora}`)
  }

  const submeterForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    aoSalvar({
      descricao,
      inicio: montarData(dataInicio, horaInicio),
      fim: montarData(dataFim, horaFim),
      completo: false
    })
    setDescricao('')
    setDataInicio('')
    setHoraInicio('')
    setDataFim('')
    setHoraFim('')
  }
  return (<form className={style.Formulario} onSubmit={submeterForm}>
    <h3 className={style.titulo}>Novo evento</h3>

    <label>Descrição</label>
    <input 
      type="text" 
      name="descricao"
      id="descricao"
      className={style.input}
      onChange={evento => setDescricao(evento.target.value)} 
      placeholder="Descrição" value={descricao} 
      autoComplete="off"
      required />

      <label>Data de início</label>
      <div className={style.inputContainer}>
        <input 
          type="date" 
          name="dataInicio"
          className={style.input}
          onChange={evento => setDataInicio(evento.target.value)} 
          value={dataInicio}
          required />
        <input 
          type="time" 
          name="horaInicio"
          className={style.input}
          onChange={evento => setHoraInicio(evento.target.value)} 
          value={horaInicio}
          required />
      </div>

      <label>Data de término</label>
      <div className={style.inputContainer}>
        <input 
          type="date" 
          name="dataFim"
          className={style.input}
          onChange={evento => setDataFim(evento.target.value)} 
          value={dataFim}
          required />
        <input 
          type="time" 
          name="horaFim"
          className={style.input}
          onChange={evento => setHoraFim(evento.target.value)} 
          value={horaFim}
          required />
      </div>

    <button className={style.botao}>
      Salvar
    </button>

  </form>)
}

export default Formulario