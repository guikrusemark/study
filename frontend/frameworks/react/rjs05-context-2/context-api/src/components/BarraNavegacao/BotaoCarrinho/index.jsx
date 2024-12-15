import useCartContext from "@/hooks/useCartContext";
import imagemCarrinho from "/assets/cart.svg";

const BotaoCarrinho = ({ className }) => {
	const { carrinho, countItems } = useCartContext();
	const classesComuns = "btn ms-3";

	return (
		<button
			className={`${classesComuns} ${className}`}
			type="button"
			data-bs-toggle="offcanvas"
			data-bs-target="#modalCarrinhoSuspenso"
			aria-controls="modalCarrinhoSuspenso"
		>
			<img src={imagemCarrinho} alt="ícone de um carrinho de supermercado" />
			{carrinho.length !== 0 && (
				<span className="badge verde-limao">{countItems(carrinho)}</span>
			)}
		</button>
	);
};

export default BotaoCarrinho;
