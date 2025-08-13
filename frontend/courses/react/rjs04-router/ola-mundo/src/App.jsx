import "./styles/main.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Menu from "./components/Menu";
import About from "./pages/About";
import Home from "./pages/Home";

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Menu />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route
						path="*"
						element={
							<h1 className="capitalize text-2xl font-bold flex justify-center p-8">
								404 | NADA ENCONTRADO
							</h1>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}
