# Mongo Service

This module centralizes MongoDB connection handling and provides simple helpers.

## Exports

- `getDb(name?: string): Promise<Db>`: Lazily connects (once) and returns a `Db` instance.
  - Name resolution order:
    1) Explicit `name` argument
    2) `MONGODB_DATABASE` env var
    3) Database parsed from `MONGODB_URI` path
  - Throws if no database name can be determined.

- `getClient(): Promise<MongoClient>`: Returns the shared, lazily-initialized `MongoClient`.

- `default export`: `Promise<MongoClient>` for backward compatibility. Prefer `getDb()` for new code.

## Environment Variables

- `MONGODB_URI` (optional): Full connection string (supports `mongodb+srv://`). If provided, it takes precedence.
- `MONGODB_HOST` (default `localhost`)
- `MONGODB_PORT` (default `27017`)
- `MONGODB_DATABASE` (recommended if not using `MONGODB_URI`)
- `MONGODB_USERNAME`, `MONGODB_PASSWORD` (optional)
- `MONGODB_AUTH_SOURCE` (default `admin`)
- `MONGODB_POOL_SIZE` (default `10`)
- `MONGODB_SERVER_SELECTION_TIMEOUT_MS` (default `5000`)

## Connection Options

The client is created with:

- `appName: "next-mongo-s3"`
- `retryWrites: true`
- `writeConcern: { w: "majority" }`
- `maxPoolSize` and `serverSelectionTimeoutMS` parsed safely from env

These are set in `MongoClientOptions` rather than embedded in the URI string for clarity.

## Usage

```ts
import { getDb } from "@/lib/services/mongo";

export async function listUsers() {
  const db = await getDb();
  return db.collection("users").find().toArray();
}
```

If you need the client (e.g., for admin commands):

```ts
import { getClient } from "@/lib/services/mongo";

const client = await getClient();
await client.db().command({ ping: 1 });
```

## Notes

- In development, a single connection is cached across module reloads.
- No secrets are logged. A simple non-sensitive log is emitted on first connect in non-production environments.
- If targeting the Edge runtime, prefer marking handlers with `export const runtime = 'nodejs'` as the MongoDB Node driver is not edge-compatible.

