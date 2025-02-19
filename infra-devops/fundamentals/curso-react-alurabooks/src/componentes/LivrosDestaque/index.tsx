import { AbBotao, AbCard } from "ds-alurabooks"
import { useState } from "react"
import { ILivro } from "../../interfaces/ILivro"

import './LivrosDestaque.css'

interface LivrosDestaqueProps {
    livros: ILivro[]
}

const LivrosDestaque = ({ livros }: LivrosDestaqueProps) => {

    const [selecionado, selecionarLivro] = useState<ILivro>(livros[0])

    return (<section className="LivrosDestaque">
        <div>
            <ul className="livros">
                {livros.map(livro => {
                    return (
                    <li 
                        key={livro.nome}
                        onClick={() => selecionarLivro(livro)} 
                        className={selecionado?.nome === livro.nome ? 'selecionado' : ''}
                    >
                        <img src={livro.imagem} alt={`Capa do livro ${livro.nome} escrito por ${livro.autor}`} />
                    </li>)
                })}
            </ul>
        </div>
        <AbCard>
            <div className="selecionado-detalhes">
                <header>
                    <h5>Sobre o livro:</h5>
                </header>
                <h6>{selecionado.nome}</h6>
                <p>{selecionado.descricao}</p>
                <p>Por: {selecionado.autor}</p>
                <footer>
                    <div className="preco">
                        <em>A partir de:</em>
                        <strong>{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(selecionado.preco)}</strong>
                    </div>
                    <div>
                        <AbBotao texto="Comprar" />
                    </div>
                </footer>
            </div>
        </AbCard>
    </section>)

}

export default LivrosDestaque