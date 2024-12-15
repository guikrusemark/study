import { useContext } from "react";

import { cartContext } from "@/context/cart";

const cartWatchers = () => {
	return useContext(cartContext);
};

const cartHandlers = () => {
	function addProduct(product, carrinho, setCarrinho) {
		const newCart = carrinho.map((item) => {
			if (item.id === product.id)
				return { ...item, quantidade: item.quantidade + 1 };
			return item;
		});
		if (!newCart.some((item) => item.id === product.id))
			newCart.push({ ...product, quantidade: 1 });

		setCarrinho(newCart);
	}

	function removeProduct(product, carrinho, setCarrinho) {
		const newCart = carrinho
			.map((item) => {
				if (item.id === product.id) {
					if (item.quantidade > 1)
						return { ...item, quantidade: item.quantidade - 1 };
					return null;
				}
				return item;
			})
			.filter(Boolean);

		setCarrinho(newCart);
	}

	function clearProduct(product, carrinho, setCarrinho) {
		const newCart = carrinho.filter((item) => item.id !== product.id);

		setCarrinho(newCart);
	}

	function getTotalValue(carrinho) {
		return carrinho.reduce((acc, item) => {
			return acc + item.preco * item.quantidade;
		}, 0);
	}

	function countItems(carrinho) {
		return carrinho.reduce((acc, item) => {
			return acc + item.quantidade;
		}, 0);
	}

	return { addProduct, removeProduct, clearProduct, getTotalValue, countItems };
};

const useCartContext = () => {
	return { ...cartWatchers(), ...cartHandlers() };
};

export default useCartContext;
