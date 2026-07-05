import { type Static, Type } from "@sinclair/typebox";

// TypeBox creates JSON Schemas with TypeScript types attached.
// Fastify uses these schemas at runtime for validation and serialization.
// TypeScript uses `Static<typeof Schema>` below to infer compile-time types.

// Standard error response shared by validation, not-found, and unexpected errors.
export const ErrorResponseSchema = Type.Object(
  {
    error: Type.String(),
    message: Type.String(),
  },
  { additionalProperties: false },
);

// Health response is intentionally exact: the only valid status is "ok".
export const HealthResponseSchema = Type.Object(
  {
    status: Type.Literal("ok"),
  },
  { additionalProperties: false },
);

// Public JSON representation of one book.
// `additionalProperties: false` rejects unknown fields in responses.
export const BookSchema = Type.Object(
  {
    id: Type.Integer({ minimum: 1 }),
    title: Type.String(),
    author: Type.String(),
    year: Type.Optional(Type.Integer()),
  },
  { additionalProperties: false },
);

// The API wraps single resources in `{ data: ... }`.
// This is a common API style because it leaves room for metadata later.
export const BookResponseSchema = Type.Object(
  {
    data: BookSchema,
  },
  { additionalProperties: false },
);

// List responses include both the records and a total.
export const BookListResponseSchema = Type.Object(
  {
    data: Type.Array(BookSchema),
    total: Type.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

// Params schema for routes like `/api/books/:id`.
// Fastify will parse and validate route params before the handler runs.
export const BookParamsSchema = Type.Object(
  {
    id: Type.Integer({ minimum: 1 }),
  },
  { additionalProperties: false },
);

// Query string schema for `/api/books?author=martin`.
// Optional means the client can omit the filter.
export const BookQuerySchema = Type.Object(
  {
    author: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

// Request body for POST /api/books.
// Title and author are required. Year is optional.
export const CreateBookBodySchema = Type.Object(
  {
    title: Type.String({ minLength: 1 }),
    author: Type.String({ minLength: 1 }),
    year: Type.Optional(Type.Integer()),
  },
  { additionalProperties: false },
);

// Request body for PATCH /api/books/:id.
// Every field is optional, but `minProperties: 1` means the body cannot be `{}`.
export const UpdateBookBodySchema = Type.Object(
  {
    title: Type.Optional(Type.String({ minLength: 1 })),
    author: Type.Optional(Type.String({ minLength: 1 })),
    year: Type.Optional(Type.Integer()),
  },
  { additionalProperties: false, minProperties: 1 },
);

// These inferred types are used in tests and handlers.
// The value schemas above run at runtime. These types help at compile time.
export type ErrorResponse = Static<typeof ErrorResponseSchema>;
export type HealthResponse = Static<typeof HealthResponseSchema>;
export type BookResponse = Static<typeof BookResponseSchema>;
export type BookListResponse = Static<typeof BookListResponseSchema>;
