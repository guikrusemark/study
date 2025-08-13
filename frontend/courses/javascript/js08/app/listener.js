import { clearBooksRendered, renderBooks } from "./render.js";

const btns = document.querySelectorAll(".btn");
let isBooksFiltered = false;

function setListeners(books) {
	btns.forEach((btn) => {
		btn.addEventListener("click", () => {
			clearBooksRendered();

			const filteredBooks = books.filter(
				(book) => book.categoria === btn.value,
			);
			if (btn.value)
				if (isBooksFiltered) {
					renderBooks(books);
					isBooksFiltered = false;
				} else {
					renderBooks(filteredBooks);
					isBooksFiltered = true;
				}
		});
	});

	const btnDisponiveis = document.getElementById("btnLivrosDisponiveis");
	btnDisponiveis.addEventListener("click", () => {
		if (isBooksFiltered) {
			clearBooksRendered();
			renderBooks(books);
			isBooksFiltered = false;
		} else {
			clearBooksRendered();
			const availableBooks = books.filter((book) => book.quantidade > 0);
			renderBooks(availableBooks);
			isBooksFiltered = true;

			const divOferta = document.createElement("div");
			divOferta.classList.add("livros__disponiveis");
			const p = document.createElement("p");
			p.textContent = "Todos os livros disponíveis por R$ ";
			const spanValor = document.createElement("span");
			spanValor.id = "valor";
			spanValor.textContent = sumBookPrices(availableBooks);

			p.appendChild(spanValor);
			divOferta.appendChild(p);
			document
				.getElementById("valor_total_livros_disponiveis")
				.appendChild(divOferta);
		}
	});

	const btnOrdenacao = document.getElementById("btnOrdenarPorPreco");
	btnOrdenacao.addEventListener("click", () => {
		if (!isBooksFiltered) {
			clearBooksRendered();
			books = books.sort((a, b) => a.preco - b.preco);
			renderBooks(books);
			isBooksFiltered = true;
		} else {
			clearBooksRendered();
			books = books.sort((a, b) => b.preco - a.preco);
			renderBooks(books);
			isBooksFiltered = false;
		}
	});

	function sumBookPrices(books) {
		return Number.parseFloat(
			books.map((book) => book.preco).reduce((acc, curr) => acc + curr),
		)
			.toFixed(2)
			.replace(".", ",");
	}
}

export { setListeners };
