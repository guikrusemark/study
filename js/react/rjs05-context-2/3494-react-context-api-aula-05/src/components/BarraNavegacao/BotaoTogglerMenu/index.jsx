import React from "react";

const BotaoTogglerMenu = () => {
  return (
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#conteudoBarraNavegacao"
      aria-controls="conteudoBarraNavegacao"
      aria-expanded="false"
      aria-label="Botão do menu navegação"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
  );
};

export default BotaoTogglerMenu;
