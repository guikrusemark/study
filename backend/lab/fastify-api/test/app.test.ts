import { expect, test } from "bun:test";

import { buildApp } from "../src/app.js";
import type {
  BookResponse,
  ErrorResponse,
  HealthResponse,
} from "../src/http/schemas.js";

// These tests use Fastify's `app.inject()` helper.
// It sends fake HTTP requests directly to the app without opening a port.
// That keeps API tests fast and stable.

test("returns a health check", async () => {
  // Each test gets a fresh app, which means a fresh in-memory repository.
  const app = buildApp();

  try {
    // `inject` accepts the same method/url/body concepts as a real HTTP client.
    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    // The response body is a string, so we parse it into a typed object.
    const health = parseJson<HealthResponse>(response.body);

    expect(response.statusCode).toBe(200);
    expect(health).toEqual({ status: "ok" });
  } finally {
    // Always close Fastify after a test. This prevents open handles.
    await app.close();
  }
});

test("creates, reads, updates, and deletes a book", async () => {
  const app = buildApp();

  try {
    // POST creates a new book. The schema validates this payload before the
    // handler calls the service.
    const createResponse = await app.inject({
      method: "POST",
      url: "/api/books",
      payload: {
        title: "Domain-Driven Design",
        author: "Eric Evans",
        year: 2003,
      },
    });
    const createdBook = parseJson<BookResponse>(createResponse.body);

    expect(createResponse.statusCode).toBe(201);
    expect(createdBook.data.id).toBe(3);

    // GET confirms the created book can be read by id.
    const readResponse = await app.inject({
      method: "GET",
      url: "/api/books/3",
    });
    const readBook = parseJson<BookResponse>(readResponse.body);

    expect(readResponse.statusCode).toBe(200);
    expect(readBook.data.title).toBe("Domain-Driven Design");

    // PATCH changes only one field. The other fields stay untouched.
    const updateResponse = await app.inject({
      method: "PATCH",
      url: "/api/books/3",
      payload: {
        year: 2004,
      },
    });
    const updatedBook = parseJson<BookResponse>(updateResponse.body);

    expect(updateResponse.statusCode).toBe(200);
    expect(updatedBook.data.year).toBe(2004);

    // DELETE removes the book and returns the deleted record.
    const deleteResponse = await app.inject({
      method: "DELETE",
      url: "/api/books/3",
    });
    const deletedBook = parseJson<BookResponse>(deleteResponse.body);

    expect(deleteResponse.statusCode).toBe(200);
    expect(deletedBook.data.id).toBe(3);
  } finally {
    await app.close();
  }
});

test("validates request bodies with route schemas", async () => {
  const app = buildApp();

  try {
    // Empty title violates `minLength: 1` in CreateBookBodySchema.
    // The route handler should not need to manually check this.
    const response = await app.inject({
      method: "POST",
      url: "/api/books",
      payload: {
        title: "",
        author: "Unknown",
      },
    });
    const error = parseJson<ErrorResponse>(response.body);

    expect(response.statusCode).toBe(400);
    expect(error.error).toBe("Bad Request");
  } finally {
    await app.close();
  }
});

// Small generic helper for typed JSON parsing in tests.
// The type parameter does not validate at runtime. Runtime validation is handled
// by Fastify schemas in the app.
function parseJson<T>(body: string): T {
  return JSON.parse(body) as T;
}
