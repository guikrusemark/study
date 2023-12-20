import React from "react";
import styles from "./Tags.module.scss";

export default function Tags({ tags, filtrarPorTag }) {
  return (
    <div className={ styles.tags }>
      <p>Filtre por tags:</p>
      <ul className={ styles.tags__lista }>
        {tags.map((tag) => (
          <li key={ tag } onClick={ () => filtrarPorTag(tag) } >{ tag }</li>
        ))}
        <li onClick={ () => filtrarPorTag('Todas') } >Todas</li>
      </ul>
    </div>
  );
}
