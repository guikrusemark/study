import {
  Book,
  type BookDto,
  type BookId,
  type BookListFilter,
  type CreateBookInput,
  toBookId,
} from "../domain/book.js";

// A repository is an abstraction over persistence.
// Today it is backed by a Map in memory. Later it could be backed by Postgres,
// MongoDB, a file, or an external API without changing the service.
export interface BookRepository {
  list(filter?: BookListFilter): Promise<readonly Book[]>;
  findById(id: BookId): Promise<Book | null>;
  create(input: CreateBookInput): Promise<Book>;
  save(book: Book): Promise<Book>;
  delete(id: BookId): Promise<Book | null>;
}

// Seed data for the demo.
// `satisfies readonly BookDto[]` checks the shape without widening everything
// to loose object types.
export const defaultBooks = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
  { id: 2, title: "Refactoring", author: "Martin Fowler", year: 2018 },
] as const satisfies readonly BookDto[];

// Simple OOP repository implementation.
// It implements the interface above, so the service can depend on the interface
// instead of this concrete class.
export class InMemoryBookRepository implements BookRepository {
  // Map gives fast lookup by id.
  // The key is a branded BookId, and the value is a Book entity.
  private readonly books = new Map<BookId, Book>();

  // Tracks the next generated id for created books.
  private nextId: number;

  // The constructor accepts seed data so tests or demos can start with known
  // records.
  constructor(seedBooks: readonly BookDto[] = defaultBooks) {
    for (const dto of seedBooks) {
      // Convert plain DTOs into Book entities before storing them.
      const book = Book.restore(dto);
      this.books.set(book.id, book);
    }

    // If seed ids are 1 and 2, the next created book gets id 3.
    this.nextId = Math.max(0, ...seedBooks.map((book) => book.id)) + 1;
  }

  // Return all books, optionally filtered by author.
  // It returns a Promise because real repositories usually do async I/O.
  async list(filter: BookListFilter = {}): Promise<readonly Book[]> {
    const books = [...this.books.values()];

    if (!filter.author) {
      return books;
    }

    const author = filter.author;

    // Reuse the Book entity's domain method for the match logic.
    return books.filter((book) => book.matchesAuthor(author));
  }

  // `null` is explicit: "we looked, and the book does not exist".
  async findById(id: BookId): Promise<Book | null> {
    return this.books.get(id) ?? null;
  }

  // Create a new entity and store it.
  // The repository owns id generation in this example.
  async create(input: CreateBookInput): Promise<Book> {
    const book = Book.create(toBookId(this.nextId), input);

    this.nextId += 1;
    this.books.set(book.id, book);

    return book;
  }

  // Save replaces the existing entity with the same id.
  // The service creates the updated Book, and the repository persists it.
  async save(book: Book): Promise<Book> {
    this.books.set(book.id, book);

    return book;
  }

  // Delete returns the removed book so the API can show what was deleted.
  async delete(id: BookId): Promise<Book | null> {
    const book = this.books.get(id) ?? null;

    if (book) {
      this.books.delete(id);
    }

    return book;
  }
}
