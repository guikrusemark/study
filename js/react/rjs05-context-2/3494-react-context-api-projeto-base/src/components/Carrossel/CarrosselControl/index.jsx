import React from "react";

const CarrosselControl = ({ variante }) => {
  return (
    <button
      className={`carousel-control-${variante}`}
      type="button"
      data-bs-target="#carrossel"
      data-bs-slide={variante}
    >
      <span
        className={`carousel-control-${variante}-icon`}
        aria-hidden="true"
      ></span>
      <span className="visually-hidden">
        {variante === "prev" ? "Anterior" : "Próximo"}
      </span>
    </button>
  );
};

export default CarrosselControl;
