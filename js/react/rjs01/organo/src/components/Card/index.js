import './Card.css';

const Card = (props) => {
    return (
        <span className="card" style={{ backgroundColor: props.teamColor }}>
            <div className="imagem">
                <img src={ props.url } alt="Imagem de perfil" />
            </div>
            <div className="nome">{ props.name }</div>
            <div className="cargo">{ props.role }</div>
        </span>
    )
}

export default Card
