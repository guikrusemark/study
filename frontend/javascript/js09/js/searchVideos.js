import { showVideos } from "./showVideos.js";

const videoCards = document.querySelector("[data-list]");

const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", doSearch);

const searchField = document.querySelector("#search");
searchField.addEventListener("keyup", doSearch);

async function doSearch() {
	const query = document.querySelector("[data-searchField]").value;

	if (query) {
		videoCards.innerHTML = "";
	}

	await showVideos.assembleVideos(query);

	if (videoCards.children.length === 0) {
		while (videoCards.firstChild) videoCards.removeChild(videoCards.firstChild);
		videoCards.innerHTML = `<h1 class="error">Não encontrado vídeos com  "${query}"</h1>`;
	}
}
