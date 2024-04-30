import { createContext, useContext, useState } from "react";

const CarrinhoContext = createContext();
CarrinhoContext.displayName = "_CarrinhoContext"; // this just names this context on the React DevTools Extension

export const CarrinhoProvider = ({ children }) => {
	const [carrinho, setCarrinho] = useState([]);
	const [quantidadeTotal, setQuantidadeTotal] = useState(0);
	const [total, setTotal] = useState(0);

	return (
		<CarrinhoContext.Provider
			value={{
				carrinho,
				setCarrinho,
				quantidadeTotal,
				setQuantidadeTotal,
				total,
				setTotal,
			}}
		>
			{children}
		</CarrinhoContext.Provider>
	);
};

export const useCarrinhoContext = (id) => {
	const {
		carrinho,
		setCarrinho,
		quantidadeTotal,
		setQuantidadeTotal,
		total,
		setTotal,
	} = useContext(CarrinhoContext);

	const [quantidade, setQuantidade] = useState(
		carrinho.find((item) => item.id === id)?.quantidade || 0,
	);

	// add or remove a product from the cart and sum the price to the total ammount
	function toggleProduto(sum, produto) {
		if ((quantidade > 0) | (sum > 0)) {
			setQuantidade(quantidade + sum);
			produto.quantidade += sum;
			setQuantidadeTotal(quantidadeTotal + sum);

			const index = carrinho.findIndex((item) => item.id === produto.id);

			if (index === -1)
				// if doesn't exist on carrinho, then push it
				carrinho.push({ ...produto });
			else carrinho[index] = { ...produto }; // if it exists, replace it

			setTotal(total + produto.valor * sum);
		}
	}

	return {
		carrinho,
		setCarrinho,
		total,
		setTotal,
		quantidade,
		setQuantidade,
		quantidadeTotal,
		toggleProduto,
	};
};
