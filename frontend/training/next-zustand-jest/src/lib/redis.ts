import Redis from "ioredis";

const {
	REDIS_URL,
	REDIS_HOST = "localhost",
	REDIS_PORT = "6379",
	REDIS_PASSWORD,
	REDIS_DB = "0",
} = process.env;

// Create Redis connection
let redis: Redis | null = null;

export function getRedisClient(): Redis {
	if (!redis) {
		if (REDIS_URL) {
			// Use Redis URL if provided (for production/cloud environments)
			redis = new Redis(REDIS_URL);
		} else {
			// Use individual connection parameters
			redis = new Redis({
				host: REDIS_HOST,
				port: Number.parseInt(REDIS_PORT),
				password: REDIS_PASSWORD,
				db: Number.parseInt(REDIS_DB),
				enableReadyCheck: false,
				maxRetriesPerRequest: null,
			});
		}

		redis.on("error", (error) => {
			console.error("Redis connection error:", error);
		});

		redis.on("connect", () => {
			console.log("Connected to Redis");
		});
	}

	return redis;
}

// Cache utility functions
export async function getCached<T = unknown>(key: string): Promise<T | null> {
	try {
		const client = getRedisClient();
		const cached = await client.get(key);
		return cached ? JSON.parse(cached) : null;
	} catch (error) {
		console.error("Redis get error:", error);
		return null;
	}
}

export async function setCache(
	key: string,
	data: unknown,
	ttl = 300, // 5 minutes default
): Promise<void> {
	try {
		const client = getRedisClient();
		await client.setex(key, ttl, JSON.stringify(data));
	} catch (error) {
		console.error("Redis set error:", error);
	}
}

export async function deleteCache(key: string): Promise<void> {
	try {
		const client = getRedisClient();
		await client.del(key);
	} catch (error) {
		console.error("Redis delete error:", error);
	}
}

export async function deleteCachePattern(pattern: string): Promise<void> {
	try {
		const client = getRedisClient();
		const keys = await client.keys(pattern);
		if (keys.length > 0) {
			await client.del(...keys);
		}
	} catch (error) {
		console.error("Redis delete pattern error:", error);
	}
}

// Advanced caching utilities
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

		// Cache the result
		await setCache(key, result, options.ttl);

		// Store cache tags if provided
		if (options.tags && options.tags.length > 0) {
			await setCacheTags(key, options.tags);
		}

		return result;
	} catch (error) {
		console.error("Cache with fallback error:", error);
		// If caching fails, still return the fallback result
		return await fallbackFn();
	}
}

// Cache tags management
export async function setCacheTags(
	cacheKey: string,
	tags: string[],
): Promise<void> {
	try {
		const client = getRedisClient();
		const pipeline = client.pipeline();

		for (const tag of tags) {
			pipeline.sadd(`tag:${tag}`, cacheKey);
		}

		await pipeline.exec();
	} catch (error) {
		console.error("Redis set cache tags error:", error);
	}
}

export async function invalidateByTag(tag: string): Promise<void> {
	try {
		const client = getRedisClient();
		const tagKey = `tag:${tag}`;

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
	} catch (error) {
		console.error("Redis invalidate by tag error:", error);
	}
}

// Cache statistics
export async function getCacheStats(): Promise<{
	totalKeys: number;
	memoryUsage: string;
	uptime: number;
} | null> {
	try {
		const client = getRedisClient();
		const info = await client.info("memory");
		const keyspace = await client.info("keyspace");
		const server = await client.info("server");

		// Parse memory usage
		const memoryMatch = info.match(/used_memory_human:(.+)\r?\n/);
		const memoryUsage = memoryMatch ? memoryMatch[1].trim() : "unknown";

		// Parse total keys
		const keysMatch = keyspace.match(/keys=(\d+)/);
		const totalKeys = keysMatch ? Number.parseInt(keysMatch[1]) : 0;

		// Parse uptime
		const uptimeMatch = server.match(/uptime_in_seconds:(\d+)/);
		const uptime = uptimeMatch ? Number.parseInt(uptimeMatch[1]) : 0;

		return {
			totalKeys,
			memoryUsage,
			uptime,
		};
	} catch (error) {
		console.error("Redis cache stats error:", error);
		return null;
	}
}

// Health check
export async function checkRedisHealth(): Promise<boolean> {
	try {
		const client = getRedisClient();
		const result = await client.ping();
		return result === "PONG";
	} catch (error) {
		console.error("Redis health check failed:", error);
		return false;
	}
}

// Close Redis connection (useful for cleanup)
export async function closeRedisConnection(): Promise<void> {
	if (redis) {
		await redis.quit();
		redis = null;
	}
}
