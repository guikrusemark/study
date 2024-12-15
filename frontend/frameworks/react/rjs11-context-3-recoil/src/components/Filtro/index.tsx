import React, { useState } from 'react';
import style from './Filtro.module.scss';

const Filtro: React.FC<{ aoFiltroAplicado: (data: Date | null) => void }> = ({ aoFiltroAplicado }) => {
  
  const [data, setData] = useState('')
  
  const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    if (!data) {
      aoFiltroAplicado(null)
      return
    }
    aoFiltroAplicado(new Date(data))
  }

  return (<form className={style.Filtro} onSubmit={submeterForm}>
    <h3 className={style.titulo}>Filtrar por data</h3>
    <input 
      type="date" 
      name="data"
      className={style.input}
      onChange={evento => setData(evento.target.value)} 
      placeholder="Por data"
      value={data} />

    <button className={style.botao}>
      Filtrar
    </button>

  </form>)
}

export default Filtro