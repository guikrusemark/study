import { createContext, useState } from "react";

const cartContext = createContext();
cartContext.displayName = "CartContext";

const CartProvider = ({ children }) => {
	const [carrinho, setCarrinho] = useState([]);

	return (
		<cartContext.Provider value={{ carrinho, setCarrinho }}>
			{children}
		</cartContext.Provider>
	);
};

export { cartContext, CartProvider };
