import React from "react";
import logoMeteora from "/assets/images/logo-meteora.png";

const Logo = () => {
  return (
    <a className="navbar-brand" href="#">
      <h1 className="m-0">
        <img className="d-block" src={logoMeteora} alt="Logo da loja Meteora" />
      </h1>
    </a>
  );
};

export default Logo;
