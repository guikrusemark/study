import React from "react";
import Banner from "../../componentes/Banner";
import ListaRestaurantes from "../../componentes/ListaRestaurantes";
import NavBar from "../../componentes/NavBar";
import Rodape from "../../componentes/Rodape";

function App() {
	return (
		<>
			<NavBar />
			<Banner />
			<ListaRestaurantes />
			<Rodape />
		</>
	);
}

export default App;
