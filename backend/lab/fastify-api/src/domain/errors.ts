import type { BookId } from "./book.js";

// A domain-specific error is easier to handle than a generic Error.
// The service throws this, and Fastify translates it to HTTP 404 in app.ts.
export class BookNotFoundError extends Error {
  // A stable code is useful for logs, monitoring, or clients that prefer codes
  // over English messages.
  readonly code = "BOOK_NOT_FOUND";

  constructor(readonly bookId: BookId) {
    super(`Book ${bookId} was not found`);
    this.name = "BookNotFoundError";
  }
}
