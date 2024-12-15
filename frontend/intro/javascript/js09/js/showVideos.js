import { connectApi } from "./connectApi.js";

const videoCards = document.querySelector("[data-list]");

function createCard(info) {
	const card = document.createElement("li");
	card.classList.add("videos__item");
	card.innerHTML = `<iframe width="100%" height="72%" src="${info.url}"
                    title="${info.titulo}"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img src="./img/logo.png" alt="logo canal alura">
                        <h3>${info.titulo}</h3>
                        <p>${info.descricao}</p>
                    </div>`;
	videoCards.appendChild(card);
}

async function listVideos(query = "") {
	return await connectApi.fetchVideos(query);
}

async function assembleVideos(query = "") {
	try {
		const list = await listVideos(query);
		list.forEach((element) => createCard(element));
	} catch (error) {
		videoCards.innerHTML =
			`<h1>Erro ao carregar os vídeos</h1>` + `<p>ERRO: ${error}</p>`;
		videoCards.classList.add("error");
	}
}

// Promise.all() used to run multiple promises in parallel instead of in a queue-like.
assembleVideos()
	.then(() => {
		console.log("Promise VIDEOS resolved");
	})
	.catch((error) => {
		console.log("Error: " + error);
	});

export const showVideos = {
	assembleVideos,
};
