import Tags from 'components/Tags'
import Cards from './Cards'
import fotos from './fotos.json'
import { useState } from 'react'
import styles from './Gallery.module.scss'

export default function Gallery() {
  const [itens, setItens] = useState(fotos);
  const tags = [...new Set(fotos.map((foto) => foto.tag))]

  function filtrarPorTag(tag) {
    if (tag === 'Todas')
      setItens(fotos);
    else
      setItens(fotos.filter((foto) => foto.tag === tag));
    
  }

  return (
    <section className={ styles.galeria } >
        <h2>
            Navegue pela galeria
        </h2>
        <Tags tags={ tags } filtrarPorTag={ filtrarPorTag } />
        <Cards itens={ itens } styles={ styles } />
    </section>
  )
}
