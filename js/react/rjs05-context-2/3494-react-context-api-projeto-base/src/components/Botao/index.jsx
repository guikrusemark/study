import React from "react";

const Botao = ({
  type,
  children,
  variant = "default",
  className,
  handleClick,
  ...rest
}) => {
  const buttonStyleMap = {
    default: "btn rounded-0 btn-outline-light",
    primary: "btn rounded-0 btn-dark botao-lilas",
    secondary: "btn rounded-0 btn-outline-purple",
    tertiary: "btn rounded-0 btn-tertiary btn-dark",
    addItem:
      "botao__circular bg-transparent border-light text-light rounded-circle",
    removeItem:
      "botao__circular border bg-transparent border-light text-light rounded-circle",
    deleteItem:
      "botao__excluir text-light fw-semibol material-symbols-outlined",
    close: "btn-close btn-close-white",
  };

  return (
    <button
      className={`${buttonStyleMap[variant]} ${className}`}
      type={type}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Botao;
