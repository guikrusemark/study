import './Titulo.css'

interface TituloProps {
    texto: string
}

const Titulo = ({ texto } : TituloProps) => {
    return (<h4 className='titulo-interno'>{texto}</h4>)
}

export default Titulo