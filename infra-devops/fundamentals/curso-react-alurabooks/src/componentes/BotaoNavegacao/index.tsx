import './BotaoNavegacao.css'

interface BotaoNavegacaoProps {
    imagemSrc: string
    textoAltSrc: string
    texto?: string
    onClick?: () => void
}

const BotaoNavegacao = ({ imagemSrc, texto, textoAltSrc, onClick }: BotaoNavegacaoProps) => {
    const manipularClick = () => {
        if (onClick) {
            onClick()
        }
    }
    
    return (<button className="btn-nav" onClick={manipularClick}>
        <img src={imagemSrc} alt={textoAltSrc} />
        {texto}
    </button>)
}

export default BotaoNavegacao