import { Route, Routes } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/restaurantes" element={<VitrineRestaurantes />} />
		</Routes>
	);
}

export default App;
