# Libraries And Frameworks For A Production Fastify API

This guide lists the libraries and framework pieces you should consider before
calling a Fastify API production-ready.

Important: not every project needs every library. Production readiness is about
choosing the right pieces for your risk, traffic, data, and team.

## Baseline Stack

For this lab, the baseline stack is:

```txt
Bun                  runtime, package manager, test runner
TypeScript           static typing
Fastify              HTTP API framework
TypeBox              route schemas
@fastify/type-provider-typebox
Biome                format and lint
```

This is a good learning stack.

For production, you usually add libraries in these categories:

```txt
configuration
security
auth
database
migrations
observability
documentation
testing
background jobs
graceful shutdown
deployment/runtime
```

## Recommended Production Categories

| Category | Common choice | Needed when |
| --- | --- | --- |
| Environment validation | `@fastify/env` or `env-schema` | You have required environment variables |
| CORS | `@fastify/cors` | Browser clients call the API from another origin |
| Security headers | `@fastify/helmet` | Public HTTP API |
| Rate limiting | `@fastify/rate-limit` | Public or abuse-prone endpoints |
| Auth utilities | `@fastify/jwt`, `@fastify/auth`, external auth SDK | Routes need user identity |
| API docs | `@fastify/swagger`, `@fastify/swagger-ui`, Scalar | Other people consume the API |
| Database | Prisma, Drizzle, Kysely, raw driver | Data must persist |
| Cache/Redis | `@fastify/redis`, Redis client | Shared cache, rate limit store, sessions, queues |
| Health/load checks | `@fastify/under-pressure` | You need readiness and overload protection |
| Logging | Fastify logger/Pino | Always in production |
| Tracing/metrics | `@fastify/otel`, OpenTelemetry SDK | You need observability across services |
| Background jobs | BullMQ | Slow work should not block HTTP requests |
| Graceful shutdown | platform signal handling, `close-with-grace`-style helper | Containers, queues, database pools |

## 1. Environment Validation

Production apps should fail fast when config is missing.

Use this for:

```txt
PORT
HOST
DATABASE_URL
JWT_SECRET
CORS_ORIGINS
LOG_LEVEL
REDIS_URL
```

Good options:

- `@fastify/env`
- `env-schema`
- Zod-based config module

`@fastify/env` is a Fastify plugin for checking environment variables. Its
registration is asynchronous, so register it before plugins that depend on
config.

Example shape:

```ts
await app.register(fastifyEnv, {
  schema: EnvSchema,
});

// app.config is available after registration
```

Rule: validate config at startup, not inside route handlers.

Sources:

- `@fastify/env`: https://github.com/fastify/fastify-env
- `env-schema`: https://github.com/fastify/env-schema

## 2. CORS

Use CORS when browsers call your API from another origin.

Example:

```txt
frontend: https://app.example.com
api:      https://api.example.com
```

Use:

```txt
@fastify/cors
```

Production rule: do not use wildcard CORS casually.

Prefer explicit origins:

```ts
await app.register(cors, {
  origin: ["https://app.example.com"],
  credentials: true,
});
```

Use permissive CORS only for local development or truly public APIs that do not
use credentials.

Source:

- `@fastify/cors`: https://github.com/fastify/fastify-cors

## 3. Security Headers

Use:

```txt
@fastify/helmet
```

Helmet sets common HTTP security headers.

Use it for public APIs unless your platform/proxy already applies equivalent
headers.

Example:

```ts
await app.register(helmet);
```

You may need route-specific adjustments for documentation pages, file downloads,
or embedded content.

Source:

- `@fastify/helmet`: https://github.com/fastify/fastify-helmet

## 4. Rate Limiting

Use rate limiting for:

```txt
login attempts
password reset
public write endpoints
search endpoints
expensive endpoints
404 probing
```

Use:

```txt
@fastify/rate-limit
```

Simple example:

```ts
await app.register(rateLimit, {
  max: 100,
  timeWindow: "1 minute",
});
```

For multiple app instances, use a shared store such as Redis. In-memory limits
only protect one process.

Source:

- `@fastify/rate-limit`: https://github.com/fastify/fastify-rate-limit

## 5. Authentication And Authorization

Authentication answers:

```txt
Who are you?
```

Authorization answers:

```txt
What are you allowed to do?
```

Common options:

```txt
@fastify/jwt        JWT signing/verifying utilities
@fastify/auth       combine multiple auth functions
@fastify/bearer-auth simple bearer token checks
external providers  Auth0, Clerk, WorkOS, Cognito, Better Auth, etc.
```

Use JWT only when it fits your system. For many apps, using an external identity
provider is better than implementing auth yourself.

Production rules:

- Do not store plain passwords.
- Do not hardcode secrets.
- Rotate secrets.
- Verify token issuer and audience when using third-party auth.
- Put authorization checks close to use cases, not only in UI code.

Sources:

- `@fastify/jwt`: https://github.com/fastify/fastify-jwt
- `@fastify/auth`: https://github.com/fastify/fastify-auth
- Fastify ecosystem auth plugins: https://fastify.io/ecosystem/

## 6. Database And Migrations

The in-memory repository in this lab is only for learning.

Production APIs usually need:

```txt
database driver or ORM
migrations
connection pooling
transaction strategy
backup/restore plan
seed data strategy
```

Common TypeScript choices:

```txt
Prisma   high-level ORM, generated client, migrations
Drizzle  lightweight TypeScript ORM, SQL-like style
Kysely   typed SQL query builder
node-postgres / mysql2 / mongodb driver directly
```

Pick based on the team:

- Choose Prisma when you want strong tooling and a high-level ORM.
- Choose Drizzle when you want SQL-shaped TypeScript and a lighter layer.
- Choose Kysely when you want a query builder close to SQL.
- Choose raw drivers when the team is comfortable owning SQL and migrations.

Sources:

- Prisma ORM: https://www.prisma.io/orm
- Drizzle ORM: https://orm.drizzle.team/

## 7. Redis, Cache, And Sessions

Redis is commonly used for:

```txt
shared cache
rate limit state
sessions
job queues
distributed locks
temporary tokens
```

Fastify option:

```txt
@fastify/redis
```

The plugin shares a Redis connection across the Fastify app.

For HTTP cache headers, consider:

```txt
@fastify/caching
```

For cookie-based sessions, consider:

```txt
@fastify/secure-session
```

Production rule: be clear whether a cache is allowed to be stale and how it is
invalidated.

Sources:

- `@fastify/redis`: https://github.com/fastify/fastify-redis
- `@fastify/caching`: https://github.com/fastify/fastify-caching
- `@fastify/secure-session`: https://github.com/fastify/fastify-secure-session

## 8. API Documentation

If humans or other systems consume the API, generate documentation.

Common Fastify choices:

```txt
@fastify/swagger
@fastify/swagger-ui
@scalar/fastify-api-reference
```

Fastify route schemas make OpenAPI generation much easier.

This is why response schemas matter. If your routes only validate input but do
not define responses, your API docs will be incomplete.

Sources:

- `@fastify/swagger`: https://github.com/fastify/fastify-swagger
- `@fastify/swagger-ui`: https://github.com/fastify/fastify-swagger-ui
- Scalar Fastify API reference:
  https://scalar.com/products/api-references/integrations/fastify

## 9. Observability

Production APIs need observability, not only logs.

You want:

```txt
logs       what happened
metrics    how the system behaves over time
traces     where time is spent across services
alerts     when humans need to act
```

Fastify already uses Pino for logging when logger mode is enabled.

For tracing and metrics:

```txt
@fastify/otel
OpenTelemetry SDK
@opentelemetry/instrumentation-fastify
```

For overload protection and health/load checks:

```txt
@fastify/under-pressure
```

Sources:

- Fastify logging: https://fastify.dev/docs/latest/Reference/Logging/
- `@fastify/otel`: https://github.com/fastify/otel
- OpenTelemetry Node.js docs:
  https://opentelemetry.io/docs/languages/js/getting-started/nodejs/
- `@fastify/under-pressure`: https://github.com/fastify/under-pressure

## 10. Background Jobs

Do not keep slow work inside HTTP requests when it can be async.

Move these to jobs:

```txt
sending emails
generating reports
image/video processing
webhook retries
syncing external APIs
scheduled cleanup
```

Common choice:

```txt
BullMQ
```

BullMQ is Redis-backed, so you also need Redis.

Source:

- BullMQ docs: https://docs.bullmq.io/

## 11. Testing Stack

For this lab:

```txt
bun:test
Fastify app.inject()
TypeScript typecheck
Biome check
```

For production, add tests by risk level:

```txt
unit tests         domain/service behavior
route tests        Fastify app.inject()
integration tests  real database or test containers
contract tests     OpenAPI/client compatibility
load tests         critical endpoints
security tests     auth, permission boundaries, rate limits
```

You do not need a heavy test framework immediately if Bun's test runner is
enough.

The important Fastify habit is `app.inject()`.

## 12. Graceful Shutdown

A production app should close cleanly when the platform asks it to stop.

Handle:

```txt
SIGTERM
SIGINT
Fastify server close
database pool close
Redis close
queue worker close
telemetry flush
```

You can implement this manually or use a helper such as a
`close-with-grace`-style package.

The key rule: do not kill the process while requests or cleanup work are still
in flight unless your platform timeout is about to expire.

## 13. Runtime And Deployment

For deployment, decide:

```txt
Bun or Node.js runtime
Docker image
process manager
platform health checks
secret management
database migrations
rollback strategy
```

This lab uses Bun locally. That is fine. Before production, verify:

- all dependencies support your Bun version
- your hosting platform supports Bun well
- build output and start command are stable
- native dependencies behave correctly

If your platform is more mature with Node.js, compiling with TypeScript and
running on Node.js can still be a valid production choice.

## Minimal Production Stack For A Small API

For a small public API, a reasonable first production stack could be:

```txt
fastify
@sinclair/typebox
@fastify/type-provider-typebox
@fastify/env
@fastify/cors
@fastify/helmet
@fastify/rate-limit
@fastify/swagger
@fastify/swagger-ui or @scalar/fastify-api-reference
Prisma or Drizzle
Pino/Fastify logger
bun:test
biome
typescript
```

Add only if needed:

```txt
@fastify/jwt
@fastify/auth
@fastify/redis
@fastify/under-pressure
@fastify/otel
BullMQ
```

## What Not To Do

Avoid these production mistakes:

- no route schemas
- no response schemas
- no config validation
- wildcard CORS with credentials
- unbounded request bodies
- authentication only in the frontend
- route handlers full of business logic
- no rate limiting on login/write endpoints
- logging secrets or tokens
- no database migration plan
- no health/readiness checks
- no graceful shutdown
- no monitoring or alerts

## Practical Order To Add Production Pieces

If evolving this lab toward production, add things in this order:

1. Environment validation.
2. CORS and security headers.
3. Real database repository.
4. Migration workflow.
5. Auth and authorization rules.
6. Rate limiting.
7. OpenAPI docs.
8. Readiness checks.
9. Graceful shutdown.
10. Observability.
11. Background jobs if needed.
12. Load tests for critical endpoints.

This order keeps the API understandable while adding the production concerns one
at a time.
