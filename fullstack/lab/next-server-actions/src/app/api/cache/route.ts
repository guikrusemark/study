import { type NextRequest, NextResponse } from "next/server";

import {
	checkRedisHealth,
	deleteCachePattern,
	getCacheStats,
	invalidateByTag,
} from "@/lib/services/redis";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const action = searchParams.get("action");

	try {
		switch (action) {
			case "health": {
				const isHealthy = await checkRedisHealth();
				return NextResponse.json({
					healthy: isHealthy,
					timestamp: new Date().toISOString(),
				});
			}

			case "stats": {
				const stats = await getCacheStats();
				return NextResponse.json({
					stats,
					timestamp: new Date().toISOString(),
				});
			}

			default:
				return NextResponse.json(
					{
						error: "Invalid action. Use ?action=health or ?action=stats",
					},
					{ status: 400 },
				);
		}
	} catch (error) {
		console.error("Cache API error:", error);
		return NextResponse.json(
			{
				error: "Internal server error",
			},
			{ status: 500 },
		);
	}
}

export async function DELETE(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const tag = searchParams.get("tag");
	const pattern = searchParams.get("pattern");

	try {
		if (tag) {
			await invalidateByTag(tag);
			return NextResponse.json({
				message: `Cache invalidated for tag: ${tag}`,
				timestamp: new Date().toISOString(),
			});
		}

		if (pattern) {
			await deleteCachePattern(pattern);
			return NextResponse.json({
				message: `Cache invalidated for pattern: ${pattern}`,
				timestamp: new Date().toISOString(),
			});
		}

		return NextResponse.json(
			{
				error: "Provide either 'tag' or 'pattern' parameter",
			},
			{ status: 400 },
		);
	} catch (error) {
		console.error("Cache invalidation error:", error);
		return NextResponse.json(
			{
				error: "Internal server error",
			},
			{ status: 500 },
		);
	}
}
