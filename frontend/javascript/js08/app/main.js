import { renderBooks } from './render.js';
import { setListeners } from './listener.js';

let books = [];

fetchBooks()
    .then(() => applyDisccount(books))
    .then(() => renderBooks(books))
    .then(() => setListeners(books));


async function fetchBooks() {
    const response = await fetch('https://guilhermeonrails.github.io/casadocodigo/livros.json');
    books = await response.json();
  
    console.table(books); // just to see the data
}

function applyDisccount(books) {
    return books.map(book => {
        book.preco = book.preco * 0.1;
        return book;
    });
}
