// Module: Mongo connection helper — builds the connection URI and exposes a single client promise

import { type Db, MongoClient, type MongoClientOptions } from "mongodb";

const {
	MONGODB_URI,
	MONGODB_USERNAME: user,
	MONGODB_PASSWORD: pwd,
	MONGODB_HOST: host = "localhost",
	MONGODB_PORT: port = "27017",
	MONGODB_DATABASE: dbName,
	MONGODB_AUTH_SOURCE: authSource = "admin",
	MONGODB_POOL_SIZE = "10",
	MONGODB_SERVER_SELECTION_TIMEOUT_MS = "5000",
} = process.env;

// Environment variables used to configure the MongoDB connection
// MONGODB_URI: Full connection URI (supports mongodb+srv://)
// MONGODB_USERNAME, MONGODB_PASSWORD: Credentials for authentication
// MONGODB_HOST, MONGODB_PORT: Host and port for the MongoDB server
// MONGODB_DATABASE: Database name
// MONGODB_AUTH_SOURCE: Authentication database (default: "admin")
// MONGODB_POOL_SIZE: Maximum number of connections in the pool (default: 10)
// MONGODB_SERVER_SELECTION_TIMEOUT_MS: Timeout for server selection (default: 5000ms)

// Build connection URI lazily: prefer full MONGODB_URI, otherwise construct safely.
function buildMongoUri(): string {
	if (MONGODB_URI && MONGODB_URI.trim().length > 0) return MONGODB_URI;

	if (!dbName) {
		throw new Error(
			"Missing one of MONGODB_DATABASE or MONGODB_URI environment variables",
		);
	}

	const u = new URL(`mongodb://${host}:${port}/`);
	u.pathname = `/${dbName}`;
	if (user && pwd) {
		// URL handles encoding for username/password
		u.username = user;
		u.password = pwd;
		u.searchParams.set("authSource", authSource);
	}
  // Keep URI minimal; behavior configured via options
  return u.toString();
}

function parsePositiveInt(input: string | undefined, fallback: number): number {
	const n = Number.parseInt(input ?? "", 10);
	return Number.isFinite(n) && n > 0 ? n : fallback;
}

const options: MongoClientOptions = {
  maxPoolSize: parsePositiveInt(MONGODB_POOL_SIZE, 10),
  serverSelectionTimeoutMS: parsePositiveInt(
    MONGODB_SERVER_SELECTION_TIMEOUT_MS,
    5000,
  ),
  appName: "next-mongo-s3",
  retryWrites: true,
  writeConcern: { w: "majority" },
};

declare global {
	// ensure we only ever create one client across module reloads (Next.js dev)
	// eslint-disable-next-line no-var
	var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function ensureClientPromise(): Promise<MongoClient> {
	if (!globalThis._mongoClientPromise) {
		const uri = buildMongoUri();
		const client = new MongoClient(uri, options);
		if (process.env.NODE_ENV !== "production") {
			// Do not log URI or secrets
			console.log("[mongo] Connecting to MongoDB...");
		}
		globalThis._mongoClientPromise = client.connect().catch((err) => {
			globalThis._mongoClientPromise = undefined;
			throw err;
		});
	}
	return globalThis._mongoClientPromise!;
}

export function getClient(): Promise<MongoClient> {
	return ensureClientPromise();
}

export async function getDb(name?: string): Promise<Db> {
	const client = await getClient();
	if (name && name.trim().length > 0) return client.db(name);
	if (dbName && dbName.trim().length > 0) return client.db(dbName);
	// Attempt to derive db name from URI path if present
	try {
		const parsed = new URL(buildMongoUri());
		const path = parsed.pathname.replace(/^\/+/, "");
		if (path) return client.db(path);
	} catch {
		// ignore parse errors and fall through
	}
	throw new Error(
		"Database name not provided. Set MONGODB_DATABASE or pass a name to getDb(name)",
	);
}

// Back-compat default export: a shared client promise
const clientPromise: Promise<MongoClient> = ensureClientPromise();
export default clientPromise;
