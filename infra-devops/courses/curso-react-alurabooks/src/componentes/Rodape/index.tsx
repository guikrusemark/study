import './Rodape.css'

const Rodape = () => {
    return (<footer className="rodape">
        <h2 className="rodape__titulo">Grupo Alura</h2>
        <ul className="lista-rodape">
            <li className="lista-rodape__titulo">Educação</li>
            <li className="lista-rodape__item">
                <img src="/imagens/CasaDoCodigo.svg" alt="Logo da casa do código" />
                <a href="#!" className="lista-rodape__link">Casa do código</a>
            </li>
            <li className="lista-rodape__item">
                <img src="/imagens/Caelum.svg" alt="Logo da caelum" />
                <a href="#!" className="lista-rodape__link">Caelum</a>
            </li>
        </ul>

        <ul className="lista-rodape">
            <li className="lista-rodape__titulo">Educação online</li>
            <li className="lista-rodape__item">
                <img src="/imagens/Alura.svg" alt="Logo da Alura" />
                <a href="#!" className="lista-rodape__link">Alura</a>
            </li>
            <li className="lista-rodape__item">
                <img src="/imagens/AluraEmpresas.svg" alt="Logo da Alura para Empresas" />
                <a href="#!" className="lista-rodape__link">Alura para Empresas</a>
            </li>
            <li className="lista-rodape__item">
                <img src="/imagens/AluraLATAM.svg" alt="Logo da Alura Latam" />
                <a href="#!" className="lista-rodape__link">Alura LATAM</a>
            </li>
            <li className="lista-rodape__item">
                <img src="/imagens/AluraStart.svg" alt="Logo da Alura START" />
                <a href="#!" className="lista-rodape__link">Alura Start</a>
            </li>
            <li className="lista-rodape__item">
                <img src="/imagens/MusicDot.svg" alt="Logo da Music Dot" />
                <a href="#!" className="lista-rodape__link">Music Dot</a>
            </li>
            <li className="lista-rodape__item">
                <img src="/imagens/AluraLingua.svg" alt="Logo da Alura Lingua" />
                <a href="#!" className="lista-rodape__link">Alura Lingua</a>
            </li>
            <li className="lista-rodape__item">
                <img src="/imagens/PM3.svg" alt="Logo da PM3" />
                <a href="#!" className="lista-rodape__link">PM3</a>
            </li>
        </ul>

        <ul className="lista-rodape">
            <li className="lista-rodape__titulo">Comunidade</li>
            <li className="lista-rodape__item">
                <img src="/imagens/HipstersTech.svg" alt="Logo do Hipsters ponto Tech" />
                <a href="#!" className="lista-rodape__link">Hipsters ponto Tech</a>
            </li>
            <li className="lista-rodape__item">
                <img src="/imagens/ScubaDev.svg" alt="Logo do Scuba Dev" />
                <a href="#!" className="lista-rodape__link">Scuba Dev</a>
            </li>
            <li className="lista-rodape__item">
                <img src="/imagens/LayersTech.svg" alt="Logo do Layers ponto Tech" />
                <a href="#!" className="lista-rodape__link">Layers ponto Tech</a>
            </li>
            <li className="lista-rodape__item">
                <img src="/imagens/LikeABoss.svg" alt="Logo do Like a Boss" />
                <a href="#!" className="lista-rodape__link">Like a Boss</a>
            </li>
            <li className="lista-rodape__item">
                <img src="/imagens/CarreiraSemFronteira.svg" alt="Logo do Carreira sem fronteiras" />
                <a href="#!" className="lista-rodape__link">Carreira sem fronteiras</a>
            </li>
            <li className="lista-rodape__item">
                <img src="/imagens/HipstersJobs.svg" alt="Logo do Hipsters ponto jobs" />
                <a href="#!" className="lista-rodape__link">Hipsters ponto jobs</a>
            </li>
            <li className="lista-rodape__item">
                <img src="/imagens/GUJ.svg" alt="Logo do GUJ" />
                <a href="#!" className="lista-rodape__link">GUJ</a>
            </li>
        </ul>
    </footer>)
}

export default Rodape