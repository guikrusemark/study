function clearBooksRendered() {
	document.getElementById("valor_total_livros_disponiveis").innerHTML = "";
	document.getElementById("livros").innerHTML = "";
}

function renderBooks(books) {
	books.forEach((book) => {
		const livrosWrapTag = document.getElementById("livros");

		const livroTag = document.createElement("div");
		livroTag.classList.add("livro");
		livrosWrapTag.appendChild(livroTag);

		const livroImg = document.createElement("img");
		livroImg.classList.add("livro__imagens");
		if (book.quantidade <= 0) livroImg.classList.add("indisponivel");
		livroImg.src = book.imagem;
		livroImg.alt = "Capa do livro " + book.titulo;
		livroTag.appendChild(livroImg);

		const livroH2 = document.createElement("h2");
		livroH2.classList.add("livro__titulo");
		livroH2.textContent = book.titulo;
		livroTag.append(livroH2);

		const livroDescricao = document.createElement("p");
		livroDescricao.classList.add("livro__descricao");
		livroDescricao.textContent = book.autor;
		livroTag.appendChild(livroDescricao);

		const livroPreco = document.createElement("p");
		livroPreco.classList.add("livro__preco");
		livroPreco.textContent =
			"R$" + Number.parseFloat(book.preco).toFixed(2).replace(".", ",");
		livroTag.appendChild(livroPreco);

		const livroTags = document.createElement("div");
		livroTags.classList.add("tags");
		const livroTagSpan = document.createElement("span");
		livroTagSpan.classList.add("tag");
		livroTagSpan.textContent = book.categoria;
		livroTags.appendChild(livroTagSpan);
		livroTag.appendChild(livroTags);
	});
}

export { renderBooks, clearBooksRendered };
