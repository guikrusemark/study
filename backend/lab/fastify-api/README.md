# Fastify API Lab

Lean Fastify + Bun + TypeScript example for demonstrating a JSON REST API.

This project assumes you know some TypeScript, but are still learning Fastify.
The code is intentionally small and heavily commented so you can read it as a
guided example.

## What This Demonstrates

- health check
- TypeBox schemas and request validation
- typed Fastify route handlers
- OOP examples: `Book` entity, repository interface, in-memory repository,
  service class, typed domain error
- Biome format/lint scripts
- focused Bun tests using `app.inject()`

## Architecture

```txt
HTTP request
  -> Fastify route in src/app.ts
  -> BookService in src/services/book-service.ts
  -> BookRepository interface
  -> InMemoryBookRepository in src/repositories/book-repository.ts
  -> Book entity in src/domain/book.ts
  -> JSON response
```

The main idea is separation of concerns:

- `src/server.ts` starts the real HTTP server.
- `src/app.ts` creates the Fastify app, registers routes, validates HTTP input,
  and maps errors to HTTP responses.
- `src/http/schemas.ts` defines TypeBox schemas used by Fastify at runtime and
  by TypeScript at compile time.
- `src/domain/book.ts` contains the `Book` entity and domain types.
- `src/domain/errors.ts` contains domain-specific errors.
- `src/repositories/book-repository.ts` abstracts persistence and provides an
  in-memory implementation.
- `src/services/book-service.ts` contains use cases, independent from HTTP.
- `test/app.test.ts` tests the API with Fastify's `app.inject()` helper.

## Learn More

- [What is a must in a Fastify API?](learn/fastify-api-must-haves.md)
- [Libraries and frameworks for production](learn/production-libraries.md)

## Important Fastify Ideas

Fastify apps are built by registering routes on an app instance:

```ts
app.get("/health", options, handler);
app.post("/api/books", options, handler);
```

Each route has three important parts:

- method and path: `GET /api/books/:id`
- options: schemas, validation, response shapes
- handler: async function that receives `request` and `reply`

Fastify automatically serializes returned objects as JSON:

```ts
app.get("/health", async () => ({ status: "ok" }));
```

Use `reply` when you need to control status codes or headers:

```ts
return reply.code(201).send({ data: book });
```

Route schemas are very important in Fastify. They give you:

- request validation before your handler runs
- safer response shapes
- better runtime errors
- better TypeScript inference when using a type provider

This project uses:

- `@sinclair/typebox` to write JSON schemas in TypeScript
- `@fastify/type-provider-typebox` so Fastify can infer `request.body`,
  `request.params`, and `request.query` from those schemas

Example:

```ts
app.get(
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
    data: await bookService.getBook(toBookId(request.params.id)),
  }),
);
```

Because `BookParamsSchema` says `id` is an integer, the handler can use
`request.params.id` as a typed number.

## Project Rules

These are the rules this example follows:

- Routes handle HTTP details only: params, query, body, status codes, and JSON.
- Services handle use cases: list, get, create, update, delete.
- Domain classes handle domain behavior: updating a book, matching author,
  converting to DTO.
- Repositories handle persistence details.
- Route handlers should not know whether data is stored in memory, Postgres, or
  another API.
- Services should not know about Fastify's `request` or `reply`.
- Tests should use `buildApp()` and `app.inject()` instead of starting a real
  server.
- Schemas should reject invalid input before business logic runs.

## Request Flow Example

For `PATCH /api/books/3`:

```txt
1. Fastify matches PATCH /api/books/:id.
2. Fastify validates params with BookParamsSchema.
3. Fastify validates body with UpdateBookBodySchema.
4. app.ts converts the raw id number into a BookId.
5. BookService finds the book or throws BookNotFoundError.
6. Book.update(...) returns a new updated Book instance.
7. InMemoryBookRepository saves the updated Book.
8. The route returns { data: updatedBookDto } as JSON.
```

## Things Worth Noticing

- `buildApp()` does not call `listen()`. This makes tests fast.
- `server.ts` is the only file that opens a network port.
- `BookId` is a branded type. It is still a number at runtime, but stricter in
  TypeScript.
- `Book` is immutable in practice: `update()` returns a new instance instead of
  mutating the old one.
- `BookRepository` is an interface, so the service can work with any storage
  implementation.
- `BookNotFoundError` is thrown by the service and translated into HTTP 404 by
  Fastify's centralized error handler.
- TypeBox schemas are runtime values. `Static<typeof Schema>` turns them into
  TypeScript types.
- Bun runs the TypeScript source directly for development and tests.
- Biome handles formatting, import ordering, and linting.

## Run

```bash
bun install
bun run dev
```

The API starts on `http://localhost:3000` by default.

Use a different port with:

```bash
PORT=3333 bun run dev
```

## Routes

```txt
GET    /health
GET    /api/books
GET    /api/books?author=martin
GET    /api/books/:id
POST   /api/books
PATCH  /api/books/:id
DELETE /api/books/:id
```

## Curl Examples

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/books
```

```bash
curl -X POST http://localhost:3000/api/books \
  -H 'content-type: application/json' \
  -d '{"title":"Domain-Driven Design","author":"Eric Evans","year":2003}'
```

```bash
curl -X PATCH http://localhost:3000/api/books/3 \
  -H 'content-type: application/json' \
  -d '{"year":2004}'
```

```bash
curl -X DELETE http://localhost:3000/api/books/3
```

## Test

```bash
bun run typecheck
bun run test
```

Build the compiled JavaScript for `src/` into `dist/` with:

```bash
bun run build
```

Run Biome with:

```bash
bun run check
```

Useful script summary:

```bash
bun run dev        # run the API in watch mode
bun run start      # run the API once
bun run test       # run Bun tests from test/
bun run typecheck  # run strict TypeScript checks
bun run check      # run Biome formatting/lint checks
bun run build      # compile TypeScript into dist/
```
