import React from 'react';
import { IEvento } from '../../interfaces/IEvento'
import style from './Evento.module.scss';
import EventoCheckbox from './EventoCheckbox';

const Evento: React.FC<{ evento: IEvento, aoAlterarStatus: (id: number) => void, aoDeletarEvento: (id: number) => void }> = ({ evento, aoAlterarStatus, aoDeletarEvento }) => {
  
  const estilos = [
    style.Evento
  ]

  if (evento.completo) {
    estilos.push(style.completo)
  }

  return (<div className={estilos.join(' ')}>

    <EventoCheckbox evento={evento} aoAlterarStatus={aoAlterarStatus}/>
    <div className="cards-info">
      <h3 className={style.descricao}>{evento.descricao} - {evento.inicio.toLocaleDateString()}</h3>
    </div>
    <i className="far fa-times-circle fa-2x" onClick={() => aoDeletarEvento(evento.id!)}></i>
  </div>)
}

export default Evento