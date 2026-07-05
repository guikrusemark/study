# What Is A Must In A Fastify API

This guide explains the baseline ideas a good Fastify API should have.

You already know some TypeScript, so the focus here is Fastify's mental model:

```txt
route schema -> validation -> typed handler -> service -> response schema
```

Fastify can be used without all of these rules, but then you miss much of what
makes Fastify valuable.

## The Short Answer

The biggest Fastify must-have is route schemas.

Fastify is schema-first. For each route, define what comes in and what goes out:

```txt
params       URL params like /api/books/:id
querystring  query params like ?author=martin
body         JSON body for POST/PATCH/PUT
response     JSON response shape by status code
```

The current lab does this with TypeBox in `src/http/schemas.ts`.

## Why Schemas Matter

Schemas give you three important things:

1. Runtime validation before your handler runs.
2. Runtime response serialization.
3. TypeScript inference inside handlers when using a type provider.

Without schemas, route handlers become full of defensive checks:

```ts
if (!request.body || typeof request.body.title !== "string") {
  return reply.code(400).send({ error: "Bad Request" });
}
```

With schemas, Fastify rejects bad input before the handler:

```ts
app.post(
  "/api/books",
  {
    schema: {
      body: CreateBookBodySchema,
      response: {
        201: BookResponseSchema,
        400: ErrorResponseSchema,
      },
    },
  },
  async (request, reply) => {
    const book = await bookService.createBook(request.body);

    return reply.code(201).send({ data: book });
  },
);
```

That handler can focus on the use case instead of manually validating every
property.

## Route Anatomy

A Fastify route has three parts:

```ts
app.get("/api/books/:id", options, handler);
```

The parts are:

```txt
method + path  app.get("/api/books/:id", ...)
options        schema, hooks, config, auth, body limits
handler        async function that returns or sends the response
```

Example from this lab:

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

What Fastify does here:

1. Match `GET /api/books/:id`.
2. Validate `request.params` using `BookParamsSchema`.
3. Infer the TypeScript type of `request.params.id`.
4. Run the handler.
5. Serialize the response using the `200` response schema.

## Must-Have 1: App Factory Separate From Server Startup

Use this shape:

```txt
src/app.ts     creates and configures the app
src/server.ts  starts listening on a port
```

Why it matters:

- Tests can call `buildApp()` without opening a port.
- Production startup code stays isolated.
- You can create app instances with different dependencies.

Good:

```ts
export function buildApp() {
  const app = Fastify();
  return app;
}
```

Then:

```ts
const app = buildApp({ logger: true });
await app.listen({ port: 3000 });
```

Avoid building the app and starting the server in the same function when you want
easy tests.

## Must-Have 2: Type Provider

Fastify can infer route types from schemas when you use a type provider.

This lab uses:

```ts
const app = Fastify(fastifyOptions).withTypeProvider<TypeBoxTypeProvider>();
```

That connects TypeBox schemas to Fastify's TypeScript types.

Without a type provider, you often have to manually type request parts:

```ts
app.get<{ Params: { id: number } }>("/api/books/:id", async (request) => {
  request.params.id;
});
```

With a type provider, the schema becomes the source of truth:

```ts
schema: {
  params: BookParamsSchema;
}
```

Then `request.params.id` is inferred.

## Must-Have 3: Response Schemas

It is common to remember request validation and forget response schemas.

Do not skip response schemas.

Response schemas help with:

- consistent response shape
- safer API contracts
- better OpenAPI generation later
- faster serialization in Fastify

Example:

```ts
response: {
  200: BookResponseSchema,
  404: ErrorResponseSchema,
}
```

This says:

```txt
200 response must look like { data: Book }
404 response must look like { error: string, message: string }
```

## Must-Have 4: Central Error Handler

A good Fastify API should not format errors randomly in every route.

Use:

```ts
app.setErrorHandler((error, request, reply) => {
  // map errors to HTTP responses
});
```

This lab maps:

```txt
BookNotFoundError        -> 404 Not Found
schema validation error  -> 400 Bad Request
unexpected error         -> 500 Internal Server Error
```

Why it matters:

- consistent error JSON
- less duplicate code
- domain errors stay independent from HTTP
- you can sanitize validation errors in production

Good response shape:

```json
{
  "error": "Not Found",
  "message": "Book 999 was not found"
}
```

Pick one error shape and keep it stable.

## Must-Have 5: Thin Route Handlers

Routes should handle HTTP details only:

```txt
read params
read query
read body
set status code
return JSON
```

Routes should not contain most business logic.

Good:

```ts
async (request) => ({
  data: await bookService.getBook(toBookId(request.params.id)),
});
```

Less good:

```ts
async (request, reply) => {
  const id = Number(request.params.id);
  const book = books.get(id);
  if (!book) {
    return reply.code(404).send(...);
  }
  // many more business rules here
}
```

The service layer exists so handlers stay small.

## Must-Have 6: Service Layer For Use Cases

The service layer contains application behavior:

```txt
listBooks
getBook
createBook
updateBook
deleteBook
```

The service should not know about Fastify.

This is good:

```ts
async getBook(id: BookId): Promise<BookDto> {
  const book = await this.findOrThrow(id);
  return book.toDto();
}
```

This is not ideal inside a service:

```ts
reply.code(404).send(...)
```

Why:

- services become easy to unit test
- services can be reused by CLI jobs, queues, or other APIs
- HTTP stays at the edge of the app

## Must-Have 7: Repository Boundary

Repositories isolate persistence.

This lab uses:

```ts
export interface BookRepository {
  list(filter?: BookListFilter): Promise<readonly Book[]>;
  findById(id: BookId): Promise<Book | null>;
  create(input: CreateBookInput): Promise<Book>;
  save(book: Book): Promise<Book>;
  delete(id: BookId): Promise<Book | null>;
}
```

Today the implementation is in memory.

Tomorrow it could be:

```txt
Postgres
SQLite
MongoDB
Redis
external API
```

The service should not care.

## Must-Have 8: Domain Types And Domain Errors

Domain code should express meaning.

This lab has:

```ts
type BookId = number & { readonly [bookIdBrand]: "BookId" };
```

That is stricter than a plain number.

It also has:

```ts
class BookNotFoundError extends Error {}
```

That is clearer than throwing generic errors everywhere.

Domain errors should be translated to HTTP at the Fastify edge.

## Must-Have 9: Logging

Fastify has built-in structured logging powered by Pino.

Enable it at app creation:

```ts
const app = buildApp({
  logger: true,
});
```

For production, configure:

```txt
log level
redaction for secrets
request ids
environment-specific formatting
shipping logs to your platform
```

Do not use `console.log` as your main production logging strategy.

Use Fastify's request logger:

```ts
request.log.info({ bookId }, "book loaded");
request.log.error(error);
```

## Must-Have 10: Tests With `app.inject()`

Fastify's `app.inject()` lets you test routes without opening a real port.

Example:

```ts
const response = await app.inject({
  method: "GET",
  url: "/health",
});
```

This tests:

```txt
route matching
schema validation
handler behavior
error handler behavior
response serialization
```

It is faster and simpler than starting a server for every test.

## Must-Have 11: Plugins Used Intentionally

Fastify is plugin-oriented.

Plugins can add:

```txt
CORS
auth
rate limits
OpenAPI
database clients
Redis
security headers
observability
```

Use:

```ts
await app.register(plugin, options);
```

Important idea: Fastify plugins are encapsulated.

That means plugin behavior can apply only to a subtree of routes when registered
inside a specific scope. This is powerful, but it means plugin registration order
and location matter.

## Must-Have 12: Health And Readiness

At minimum:

```txt
GET /health
```

For real production, separate:

```txt
/health     process is alive
/ready      app can serve traffic, database/cache dependencies are reachable
```

Health checks should be simple and fast.

Readiness checks may verify dependencies.

## Must-Have 13: Environment Validation

Production apps should validate environment variables at startup.

Examples:

```txt
PORT
HOST
DATABASE_URL
JWT_SECRET
CORS_ORIGINS
LOG_LEVEL
```

If required config is missing, fail during startup, not during the first user
request.

## Must-Have 14: Security Defaults

For production, plan for:

```txt
auth
CORS
security headers
rate limiting
body size limits
safe error messages
secret redaction in logs
dependency updates
```

Fastify does not force all of this into core. You add these concerns with
plugins and platform configuration.

## Must-Have 15: OpenAPI For Shared APIs

If another frontend, mobile app, or external team consumes your API, generate
OpenAPI docs.

Fastify route schemas can become API documentation.

This is another reason response schemas matter.

## Must-Have 16: Graceful Shutdown

Production servers should handle shutdown signals.

When a container or platform sends `SIGTERM`, the app should stop accepting new
traffic and close existing resources:

```txt
HTTP server
database pool
Redis connection
queue workers
telemetry exporters
```

This lab does not implement graceful shutdown yet because it is intentionally
small, but real APIs should.

## Current Lab Coverage

This lab already has:

```txt
yes  app factory separate from server startup
yes  TypeBox route schemas
yes  TypeBox type provider
yes  response schemas
yes  central error handler
yes  service layer
yes  repository interface
yes  domain class and domain error
yes  Fastify logger enabled in server.ts
yes  app.inject() tests
no   auth
no   CORS
no   rate limiting
no   OpenAPI docs
no   production database
no   graceful shutdown
no   observability/metrics/tracing
```

That is fine for a learning API. It is not a complete production API yet.

## Rules To Remember

1. Put schemas on every route.
2. Use a type provider so schemas become handler types.
3. Keep route handlers thin.
4. Put use cases in services.
5. Put storage behind repositories.
6. Use domain errors instead of generic strings.
7. Convert domain errors to HTTP errors in one place.
8. Test with `app.inject()`.
9. Use plugins deliberately.
10. Validate config before serving requests.
11. Add production security and observability before deploying.

## Sources

- Fastify validation and serialization:
  https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/
- Fastify type providers:
  https://fastify.dev/docs/latest/Reference/Type-Providers/
- Fastify errors:
  https://fastify.dev/docs/latest/Reference/Errors/
- Fastify hooks:
  https://fastify.dev/docs/latest/Reference/Hooks/
- Fastify plugins:
  https://fastify.dev/docs/latest/Reference/Plugins/
- Fastify logging:
  https://fastify.dev/docs/latest/Reference/Logging/
