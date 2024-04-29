import React from "react";
import Titulo from "@/components/Titulo";

const ItemCarrossel = ({ src, alt, itemCarrossel }) => {
  return (
    <div
      className={`image-height carousel-item ${itemCarrossel ? "" : "active"}`}
    >
      <img
        className={`w-100 img-fluid cover-image ${
          itemCarrossel ? "cover-center" : "cover-left"
        }`}
        src={src}
        alt={alt}
      />
      {itemCarrossel && (
        <div className="carousel-caption">
          <Titulo element="h5" className="fs-1">
            {itemCarrossel.titulo}
          </Titulo>
          <p className="fs-4">{itemCarrossel.subtitulo}</p>
        </div>
      )}
    </div>
  );
};

export default ItemCarrossel;
