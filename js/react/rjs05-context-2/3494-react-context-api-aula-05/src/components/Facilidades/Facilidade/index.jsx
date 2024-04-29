import React from "react";

const Facilidade = ({ src, alt, titulo, descricao }) => {
  return (
    <div className="divs-facilidades d-flex">
      <img className="verde-limao bi bi-x-diamond fs-1" src={src} alt={alt} />
      <div>
        <h5 className="ms-3 mb-1 verde-limao">{titulo}</h5>
        <p className="texto-menor ms-3">{descricao}</p>
      </div>
    </div>
  );
};

export default Facilidade;
