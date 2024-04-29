import React from "react";

const Titulo = ({ children, classes, element, ...rest }) => {
  const Element = element || "h2";
  return (
    <Element
      className={classes ? classes : "text-center fw-semibold my-3 my-xl-5"}
      {...rest}
    >
      {children}
    </Element>
  );
};

export default Titulo;
