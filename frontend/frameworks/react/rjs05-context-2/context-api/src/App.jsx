import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CartProvider } from "@/context/cart";
import { Carrinho, Home, PaginaErro } from "@/pages";

import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<CartProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/carrinho" element={<Carrinho />} />
					<Route path="*" element={<PaginaErro />} />
				</Routes>
			</CartProvider>
		</BrowserRouter>
	);
}

export default App;
