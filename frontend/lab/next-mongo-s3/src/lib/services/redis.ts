// Redis helper utilities: lazy client, safe env parsing, caching helpers, tag invalidation, and stats

import type { Redis as IORedisClient, RedisOptions } from "ioredis";
import RedisDefault from "ioredis";

const {
	REDIS_URL,
	REDIS_HOST = "localhost",
	REDIS_PORT = "6379",
	REDIS_PASSWORD,
	REDIS_DB = "0",
	REDIS_KEY_PREFIX = "",
	REDIS_TLS = "",
	REDIS_DEBUG = "false",
	DISABLE_REDIS = "false",
} = process.env;

// Parsed numeric env values (safe defaults)
const REDIS_PORT_NUM = Number.parseInt(REDIS_PORT || "6379", 10) || 6379;
const REDIS_DB_NUM = Math.max(0, Number.parseInt(REDIS_DB || "0", 10) || 0);
// USE_TLS is true if REDIS_TLS is set to "true" or "1" (any other value is treated as false)
const USE_TLS = REDIS_TLS === "true" || REDIS_TLS === "1";
const DEBUG = REDIS_DEBUG === "true";
const REDIS_DISABLED = DISABLE_REDIS === "true";

// Create Redis connection (lazy) — only connects when first used
let redis: IORedisClient | null = null;

function logDebug(...args: unknown[]) {
	if (DEBUG) console.debug(...(args as [unknown, ...unknown[]]));
}

// Prefix keys consistently when a prefix is configured
function prefixKey(key: string): string {
	return REDIS_KEY_PREFIX ? `${REDIS_KEY_PREFIX}:${key}` : key;
}

// Validate minimal configuration at runtime (throws if required vars missing)
function ensureConfig(): void {
	if (REDIS_DISABLED) return;
	// Basic validation performed lazily so imports won't throw in environments
	// that don't need Redis (e.g. certain local tooling).
	if (!REDIS_URL && !REDIS_HOST) {
		throw new Error(
			"Redis configuration missing: provide REDIS_URL or REDIS_HOST",
		);
	}
	if (!REDIS_URL && (Number.isNaN(REDIS_PORT_NUM) || REDIS_PORT_NUM <= 0)) {
		throw new Error("Invalid REDIS_PORT: must be a positive number");
	}
	if (!REDIS_URL && (Number.isNaN(REDIS_DB_NUM) || REDIS_DB_NUM < 0)) {
		throw new Error("Invalid REDIS_DB: must be a non-negative number");
	}
}

export function getRedisClient(): IORedisClient {
	if (REDIS_DISABLED) {
		throw new Error("Redis is disabled via DISABLE_REDIS environment flag");
	}

	// Create the client once and reuse (singleton)
	if (!redis) {
		ensureConfig();

		const commonOptions: RedisOptions = {
			password: REDIS_PASSWORD,
			db: REDIS_DB_NUM,
			// Allow unlimited retries per request and use a retry strategy
			maxRetriesPerRequest: null,
			retryStrategy: (times: number) => Math.min(times * 50, 2000),
			reconnectOnError: (err: Error) => {
				// Attempt reconnect on transient errors (customize as needed)
				const message = err?.message ?? "";
				if (message.includes("READONLY")) return true;
				return false;
			},
			enableOfflineQueue: true,
		};

		const tlsOptions = USE_TLS ? { tls: {} } : {};

		// Use URL when provided (works with managed cloud providers)
		if (REDIS_URL) {
			redis = new RedisDefault(REDIS_URL, {
				...commonOptions,
				...tlsOptions,
			});
		} else {
			redis = new RedisDefault({
				host: REDIS_HOST,
				port: REDIS_PORT_NUM,
				...commonOptions,
				...tlsOptions,
			});
		}

		// redis is guaranteed to be non-null here
		const client = redis as IORedisClient;

		// Useful logging hooks
		client.on("error", (error: Error) => {
			console.error("Redis connection error:", error);
		});

		client.on("connect", () => {
			logDebug("Connected to Redis");
		});

		client.on("ready", () => {
			logDebug("Redis client ready");
		});
	}

	return redis as IORedisClient;
}

// Cache utility functions — get/set/delete with JSON handling
export async function getCached<T = unknown>(key: string): Promise<T | null> {
	if (REDIS_DISABLED) return null;
	try {
		const client = getRedisClient();
		const cached = await client.get(prefixKey(key));
		if (!cached) return null;
		try {
			return JSON.parse(cached) as T;
		} catch (parseError) {
			console.error("Failed to parse cached data:", parseError);
			return null;
		}
	} catch (error: unknown) {
		console.error("Redis get error:", error);
		return null;
	}
}

export async function setCache(
	key: string,
	data: unknown,
	ttl = 300, // 5 minutes default
): Promise<void> {
	if (REDIS_DISABLED) return;
	try {
		const client = getRedisClient();
		let serialized: string;
		try {
			// Safe JSON stringify; may throw on circular structures
			serialized = JSON.stringify(data);
		} catch (serializeError) {
			console.error("Failed to serialize data for caching:", serializeError);
			return;
		}

		const fullKey = prefixKey(key);
		if (typeof ttl === "number" && ttl > 0) {
			await client.setex(fullKey, ttl, serialized);
		} else {
			// Persist indefinitely if ttl is 0 or negative
			await client.set(fullKey, serialized);
		}
	} catch (error: unknown) {
		console.error("Redis set error:", error);
	}
}

// Delete a single cache key
export async function deleteCache(key: string): Promise<void> {
	if (REDIS_DISABLED) return;
	try {
		const client = getRedisClient();
		await client.del(prefixKey(key));
	} catch (error: unknown) {
		console.error("Redis delete error:", error);
	}
}

// Delete keys by pattern using SCAN (safe for production)
export async function deleteCachePattern(pattern: string): Promise<void> {
	if (REDIS_DISABLED) return;
	try {
		const client = getRedisClient();

		// If user passed a pattern without wildcard, append a trailing *
		const matchPattern = pattern.includes("*")
			? prefixKey(pattern)
			: `${prefixKey(pattern)}*`;

		let cursor = "0";
		do {
			const [nextCursor, keys] = await client.scan(
				cursor,
				"MATCH",
				matchPattern,
				"COUNT",
				100,
			);
			cursor = String(nextCursor);
			if (keys && keys.length > 0) {
				// Use a pipeline per batch to avoid huge memory usage
				const pipeline = client.pipeline();
				pipeline.del(...keys);
				await pipeline.exec();
			}
		} while (cursor !== "0");
	} catch (error: unknown) {
		console.error("Redis delete pattern error:", error);
	}
}

// Advanced caching utilities — fallback loader and tag support
export interface CacheOptions {
	ttl?: number; // Time to live in seconds
	tags?: string[]; // Cache tags for group invalidation
}

export async function getCachedWithFallback<T>(
	key: string,
	fallbackFn: () => Promise<T>,
	options: CacheOptions = {},
): Promise<T> {
	try {
		// Try to get from cache first
		const cached = await getCached<T>(key);
		if (cached !== null) {
			return cached;
		}

		// If not in cache, execute fallback function
		const result = await fallbackFn();

		// Try to cache the result (don't fail the whole operation if caching fails)
		try {
			await setCache(key, result, options.ttl ?? 300);
			if (options.tags && options.tags.length > 0) {
				await setCacheTags(key, options.tags);
			}
		} catch (cacheError: unknown) {
			console.error("Caching failed, but returning result:", cacheError);
		}

		return result;
	} catch (error: unknown) {
		console.error("Cache with fallback error:", error);
		// Re-throw the error if fallbackFn fails, as we can't recover
		throw error;
	}
}

// Tagging helpers — store references from tags -> cache keys
export async function setCacheTags(
	cacheKey: string,
	tags: string[],
): Promise<void> {
	if (REDIS_DISABLED) return;
	try {
		const client = getRedisClient();
		const pipeline = client.pipeline();

		const fullCacheKey = prefixKey(cacheKey);
		for (const tag of tags) {
			pipeline.sadd(prefixKey(`tag:${tag}`), fullCacheKey);
		}

		await pipeline.exec();
	} catch (error: unknown) {
		console.error("Redis set cache tags error:", error);
	}
}

// Invalidate all cache keys associated with a tag
export async function invalidateByTag(tag: string): Promise<void> {
	if (REDIS_DISABLED) return;
	try {
		const client = getRedisClient();
		const tagKey = prefixKey(`tag:${tag}`);

		// Get all cache keys with this tag
		const cacheKeys = await client.smembers(tagKey);

		if (cacheKeys.length > 0) {
			// Delete all cache entries with this tag
			const pipeline = client.pipeline();
			for (const key of cacheKeys) {
				pipeline.del(key);
			}
			// Also delete the tag set
			pipeline.del(tagKey);

			await pipeline.exec();
		}
	} catch (error: unknown) {
		console.error("Redis invalidate by tag error:", error);
	}
}

// Cache statistics — parse INFO output for basic metrics
export async function getCacheStats(): Promise<{
	totalKeys: number;
	memoryUsage: string;
	uptime: number;
} | null> {
	if (REDIS_DISABLED) return null;
	try {
		const client = getRedisClient();
		const info = await client.info();

		// Parse memory usage (prefer human readable)
		const memoryHumanMatch = info.match(/used_memory_human:([^\\r\\n]+)/i);
		const memoryUsage = memoryHumanMatch
			? memoryHumanMatch[1].trim()
			: (() => {
					const memMatch = info.match(/used_memory:(\d+)/i);
					return memMatch
						? `${Number(memMatch[1]).toLocaleString()} bytes`
						: "unknown";
				})();

		// Sum keys across all DB keyspace entries (db0, db1...)
		let totalKeys = 0;
		const keyspaceRegex = /db\d+:keys=(\d+),/gi;
		let match: RegExpExecArray | null = keyspaceRegex.exec(info);
		while (match !== null) {
			totalKeys += Number.parseInt(match[1], 10) || 0;
			match = keyspaceRegex.exec(info);
		}

		// Parse uptime
		const uptimeMatch = info.match(/uptime_in_seconds:(\d+)/i);
		const uptime = uptimeMatch ? Number.parseInt(uptimeMatch[1], 10) : 0;

		return {
			totalKeys,
			memoryUsage,
			uptime,
		};
	} catch (error: unknown) {
		console.error("Redis cache stats error:", error);
		return null;
	}
}

// Health check — simple PING -> PONG
export async function checkRedisHealth(): Promise<boolean> {
	if (REDIS_DISABLED) return true;
	try {
		const client = getRedisClient();
		const result = await client.ping();
		return result === "PONG";
	} catch (error: unknown) {
		console.error("Redis health check failed:", error);
		return false;
	}
}

// Close Redis connection (useful for cleanup) — attempts quit then disconnect
export async function closeRedisConnection(): Promise<void> {
	if (redis) {
		try {
			await redis.quit();
		} catch {
			// If quit fails, attempt to disconnect
			try {
				redis.disconnect();
			} catch {
				// ignore
			}
		}
		redis = null;
	}
}
