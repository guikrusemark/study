import axios from "axios";
import { useEffect, useState } from "react";
import type { IPaginacao } from "../../interfaces/IPaginacao";
import type IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";

const ListaRestaurantes = () => {
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
	const [proximaPagina, setProximaPagina] = useState("");

	useEffect(() => {
		// obter restaurantes
		axios
			.get<IPaginacao<IRestaurante>>(
				"http://localhost:8000/api/v1/restaurantes/",
			)
			.then((resposta) => {
				setRestaurantes(resposta.data.results);
				setProximaPagina(resposta.data.next);
			})
			.catch((erro) => {
				console.log(erro);
			});
	}, []);

	const verMais = () => {
		axios
			.get<IPaginacao<IRestaurante>>(proximaPagina)
			.then((resposta) => {
				setRestaurantes([...restaurantes, ...resposta.data.results]);
				setProximaPagina(resposta.data.next);
			})
			.catch((erro) => {
				console.log(erro);
			});
	};

	return (
		<section className={style.ListaRestaurantes}>
			<h1>
				Os restaurantes mais <em>bacanas</em>!
			</h1>
			{restaurantes?.map((item) => (
				<Restaurante restaurante={item} key={item.id} />
			))}
			{proximaPagina && (
				<button type="button" onClick={verMais}>
					ver mais
				</button>
			)}
		</section>
	);
};

export default ListaRestaurantes;
