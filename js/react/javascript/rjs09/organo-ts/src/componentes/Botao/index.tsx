import React from 'react';
import './Botao.css'

interface BotaoProps {
    children: React.ReactElement | string;
};

const Botao = ({ children }: BotaoProps) => {
    return (
      <button className='botao'>
          {children}
      </button>
    )
}

export default Botao
