import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import Fastify, { type FastifyServerOptions } from "fastify";

import { toBookId } from "./domain/book.js";
import { BookNotFoundError } from "./domain/errors.js";
import {
  BookListResponseSchema,
  BookParamsSchema,
  BookQuerySchema,
  BookResponseSchema,
  CreateBookBodySchema,
  type ErrorResponse,
  ErrorResponseSchema,
  type HealthResponse,
  HealthResponseSchema,
  UpdateBookBodySchema,
} from "./http/schemas.js";
import { InMemoryBookRepository } from "./repositories/book-repository.js";
import { BookService } from "./services/book-service.js";

// This type extends Fastify's native server options with one custom dependency.
// Passing `bookService` is useful in tests because you can inject a fake service
// or a service backed by a different repository.
export type BuildAppOptions = FastifyServerOptions & {
  readonly bookService?: BookService;
};

// `buildApp` creates the Fastify instance and registers every route.
// Keeping this separate from `server.ts` makes the API easy to test with
// `app.inject()` without opening a real network port.
export function buildApp(options: BuildAppOptions = {}) {
  const {
    // This is a small dependency-injection example:
    // app -> service -> repository.
    // If the caller does not pass a service, the app uses an in-memory database.
    bookService = new BookService(new InMemoryBookRepository()),
    ...fastifyOptions
  } = options;

  // `Fastify(options)` creates the HTTP app.
  // `.withTypeProvider<TypeBoxTypeProvider>()` connects TypeBox schemas to
  // TypeScript so `request.params`, `request.query`, and `request.body` are
  // inferred from the schemas declared inside each route.
  const app = Fastify(fastifyOptions).withTypeProvider<TypeBoxTypeProvider>();

  // Centralized error handling keeps route handlers small.
  // Instead of returning 404/400 logic in every route, domain and validation
  // errors are translated here into JSON HTTP responses.
  app.setErrorHandler((error, request, reply) => {
    // Domain error: the service could not find a requested book.
    if (error instanceof BookNotFoundError) {
      return reply.code(404).send(toErrorResponse("Not Found", error.message));
    }

    // Fastify/AJV validation error: params/query/body failed the route schema.
    if (isValidationError(error)) {
      return reply
        .code(400)
        .send(toErrorResponse("Bad Request", error.message));
    }

    // Fastify may pass values typed as `unknown`. We normalize them to Error so
    // logging and responses have a predictable shape.
    const fallbackError =
      error instanceof Error ? error : new Error("Unexpected server error");

    // `request.log` is Fastify's request-aware logger. It includes request
    // context when logger mode is enabled in `server.ts`.
    request.log.error(fallbackError);

    // Unexpected errors still return JSON, but with the most relevant status
    // Fastify exposed. If there is no known status, this becomes a 500.
    return reply
      .code(getStatusCode(error))
      .send(
        toErrorResponse(
          fallbackError.name || "Internal Server Error",
          fallbackError.message || "Unexpected server error",
        ),
      );
  });

  // GET /health is a common operational endpoint.
  // It is intentionally tiny: monitoring tools can call it to see if the app
  // process is alive and able to answer HTTP requests.
  app.get(
    "/health",
    {
      // Fastify route schemas can validate inputs and serialize outputs.
      // Here there is only an output schema for HTTP 200.
      schema: {
        response: {
          200: HealthResponseSchema,
        },
      },
    },
    async (): Promise<HealthResponse> => ({ status: "ok" }),
  );

  // GET /api/books lists books.
  // Example:
  // curl http://localhost:3000/api/books
  // curl "http://localhost:3000/api/books?author=martin"
  app.get(
    "/api/books",
    {
      schema: {
        // `querystring` validates and types `request.query`.
        // Because of TypeBoxTypeProvider, `request.query.author` is known as an
        // optional string in the handler below.
        querystring: BookQuerySchema,
        response: {
          200: BookListResponseSchema,
          400: ErrorResponseSchema,
        },
      },
    },
    // The handler delegates business behavior to the service.
    // Fastify returns the object as JSON automatically.
    async (request) => bookService.listBooks(request.query),
  );

  // GET /api/books/:id reads one book.
  // The `:id` part is a route parameter and is available as `request.params.id`.
  app.get(
    "/api/books/:id",
    {
      schema: {
        // Fastify validates that `id` is an integer >= 1 before the handler runs.
        params: BookParamsSchema,
        response: {
          200: BookResponseSchema,
          404: ErrorResponseSchema,
        },
      },
    },
    async (request) => ({
      // `toBookId` converts a plain number into the branded domain id type.
      // This keeps the service API stricter than raw HTTP input.
      data: await bookService.getBook(toBookId(request.params.id)),
    }),
  );

  // POST /api/books creates one book.
  // Body example:
  // { "title": "Domain-Driven Design", "author": "Eric Evans", "year": 2003 }
  app.post(
    "/api/books",
    {
      schema: {
        // `body` validates and types `request.body`.
        // Empty strings and unknown fields are rejected by the schema.
        body: CreateBookBodySchema,
        response: {
          201: BookResponseSchema,
          400: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const book = await bookService.createBook(request.body);

      // `reply.code(201)` sets the HTTP status to Created.
      // `.send(...)` sends the JSON response.
      return reply.code(201).send({ data: book });
    },
  );

  // PATCH /api/books/:id partially updates a book.
  // PATCH means the client may send only the fields it wants to change.
  app.patch(
    "/api/books/:id",
    {
      schema: {
        params: BookParamsSchema,
        // `minProperties: 1` in this schema rejects an empty update body.
        body: UpdateBookBodySchema,
        response: {
          200: BookResponseSchema,
          400: ErrorResponseSchema,
          404: ErrorResponseSchema,
        },
      },
    },
    async (request) => ({
      // The route layer is responsible for HTTP details and input conversion.
      // The service is responsible for the use case.
      data: await bookService.updateBook(
        toBookId(request.params.id),
        request.body,
      ),
    }),
  );

  // DELETE /api/books/:id removes one book and returns the removed record.
  // Returning the deleted resource is useful in demos because you can see what
  // was removed.
  app.delete(
    "/api/books/:id",
    {
      schema: {
        params: BookParamsSchema,
        response: {
          200: BookResponseSchema,
          404: ErrorResponseSchema,
        },
      },
    },
    async (request) => ({
      data: await bookService.deleteBook(toBookId(request.params.id)),
    }),
  );

  return app;
}

// Small response factory. A single helper keeps all error responses in the same
// JSON shape: { "error": "...", "message": "..." }.
function toErrorResponse(error: string, message: string): ErrorResponse {
  return { error, message };
}

// Type guard for Fastify validation errors.
// TypeScript starts with `unknown`, and this function narrows it enough to read
// `error.message` and know that the `validation` marker exists.
function isValidationError(
  error: unknown,
): error is Error & { validation: unknown } {
  return error instanceof Error && "validation" in error;
}

// Some Fastify errors carry `statusCode`. This helper reads it safely from an
// unknown value without using `any`.
function getStatusCode(error: unknown): number {
  if (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    typeof error.statusCode === "number"
  ) {
    return error.statusCode;
  }

  return 500;
}
