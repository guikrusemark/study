import { connectApi } from "./connectApi.js";

const form = document.querySelector("[data-form]");

async function addCard(event) {
	event.preventDefault();

	const titulo = document.querySelector("[data-titulo]").value;
	const descricao = Math.floor(Math.random() * 100) + "mil visualizações";
	const url = document.querySelector("[data-url]").value;

	try {
		await connectApi.addVideo(titulo, descricao, url);

		window.location.href = "../index.html";
	} catch (error) {
		const main = document.querySelector("main");
		main.innerHTML =
			`<h1>Erro ao carregar os vídeos</h1>` + `<p>ERRO: ${error}</p>`;

		main.classList.add("error");
	}

	await connectApi.addVideo(titulo, descricao, url);
}

form.addEventListener("submit", (event) => addCard(event));
