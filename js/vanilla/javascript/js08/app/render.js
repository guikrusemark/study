function clearBooksRendered() {
    document.getElementById('valor_total_livros_disponiveis').innerHTML = '';
    document.getElementById('livros').innerHTML = '';
}

function renderBooks(books) {
    books.forEach(book => { 
        let livrosWrapTag = document.getElementById('livros');
    
        let livroTag = document.createElement('div');
        livroTag.classList.add('livro');
        livrosWrapTag.appendChild(livroTag);
        
        let livroImg = document.createElement('img');
        livroImg.classList.add('livro__imagens');
        if(book.quantidade <= 0)
            livroImg.classList.add('indisponivel');
        livroImg.src = book.imagem;
        livroImg.alt = "Capa do livro " + book.titulo;
        livroTag.appendChild(livroImg);
        
        let livroH2 = document.createElement('h2');
        livroH2.classList.add('livro__titulo');
        livroH2.textContent = book.titulo;
        livroTag.append(livroH2);
        
        let livroDescricao = document.createElement('p');
        livroDescricao.classList.add('livro__descricao');
        livroDescricao.textContent = book.autor;
        livroTag.appendChild(livroDescricao);
        
        let livroPreco = document.createElement('p');
        livroPreco.classList.add('livro__preco');
        livroPreco.textContent = "R$" + parseFloat(book.preco).toFixed(2).replace('.', ',');
        livroTag.appendChild(livroPreco);
        
        let livroTags = document.createElement('div');
        livroTags.classList.add('tags');
        let livroTagSpan = document.createElement('span');
        livroTagSpan.classList.add('tag');
        livroTagSpan.textContent = book.categoria;
        livroTags.appendChild(livroTagSpan);
        livroTag.appendChild(livroTags);
    });
}

export { renderBooks, clearBooksRendered };
