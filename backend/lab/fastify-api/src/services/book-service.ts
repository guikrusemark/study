import type {
  Book,
  BookDto,
  BookId,
  BookListFilter,
  CreateBookInput,
  UpdateBookInput,
} from "../domain/book.js";
import { BookNotFoundError } from "../domain/errors.js";
import type { BookRepository } from "../repositories/book-repository.js";

// Service return type for list endpoints.
// The API layer can return this directly as JSON.
export type BookListResult = Readonly<{
  data: BookDto[];
  total: number;
}>;

// The service contains application use cases.
// It does not know about HTTP, Fastify, request objects, or response codes.
// That separation makes it easier to test and easier to reuse.
export class BookService {
  // The service depends on the repository interface, not the in-memory class.
  // This is dependency inversion in a small, practical form.
  constructor(private readonly repository: BookRepository) {}

  // Use case: list books.
  // The repository returns Book entities, and the service converts them to DTOs.
  async listBooks(filter: BookListFilter): Promise<BookListResult> {
    const books = await this.repository.list(filter);
    const data = books.map((book) => book.toDto());

    return {
      data,
      total: data.length,
    };
  }

  // Use case: read one book by id.
  async getBook(id: BookId): Promise<BookDto> {
    const book = await this.findOrThrow(id);

    return book.toDto();
  }

  // Use case: create one book.
  // Validation of required fields happens in Fastify schemas before this runs.
  async createBook(input: CreateBookInput): Promise<BookDto> {
    const book = await this.repository.create(input);

    return book.toDto();
  }

  // Use case: update one book.
  // The Book entity owns the immutable update behavior.
  async updateBook(id: BookId, input: UpdateBookInput): Promise<BookDto> {
    const book = await this.findOrThrow(id);
    const updatedBook = await this.repository.save(book.update(input));

    return updatedBook.toDto();
  }

  // Use case: delete one book.
  // If the repository returns null, the service raises a domain error.
  async deleteBook(id: BookId): Promise<BookDto> {
    const book = await this.repository.delete(id);

    if (!book) {
      throw new BookNotFoundError(id);
    }

    return book.toDto();
  }

  // Private helper shared by read and update.
  // Throwing here lets the Fastify error handler decide the HTTP response.
  private async findOrThrow(id: BookId): Promise<Book> {
    const book = await this.repository.findById(id);

    if (!book) {
      throw new BookNotFoundError(id);
    }

    return book;
  }
}
