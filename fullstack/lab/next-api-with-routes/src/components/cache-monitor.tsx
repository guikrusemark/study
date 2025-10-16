"use client";

import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CacheStats {
	totalKeys: number;
	memoryUsage: string;
	uptime: number;
}

interface CacheHealth {
	healthy: boolean;
	timestamp: string;
}

export default function CacheMonitor() {
	const [stats, setStats] = useState<CacheStats | null>(null);
	const [health, setHealth] = useState<CacheHealth | null>(null);
	const [loading, setLoading] = useState(false);

	const fetchCacheStats = useCallback(async () => {
		setLoading(true);
		try {
			const [statsResponse, healthResponse] = await Promise.all([
				fetch("/api/cache?action=stats"),
				fetch("/api/cache?action=health"),
			]);

			if (statsResponse.ok) {
				const statsData = await statsResponse.json();
				setStats(statsData.stats);
			}

			if (healthResponse.ok) {
				const healthData = await healthResponse.json();
				setHealth(healthData);
			}
		} catch (error) {
			console.error("Failed to fetch cache info:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	const invalidateCache = async (tag: string) => {
		try {
			const response = await fetch(`/api/cache?tag=${tag}`, {
				method: "DELETE",
			});

			if (response.ok) {
				alert(`Cache invalidated for tag: ${tag}`);
				await fetchCacheStats(); // Refresh stats
			} else {
				alert("Failed to invalidate cache");
			}
		} catch (error) {
			console.error("Failed to invalidate cache:", error);
			alert("Failed to invalidate cache");
		}
	};

	useEffect(() => {
		fetchCacheStats();
	}, [fetchCacheStats]);

	const formatUptime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		return `${hours}h${minutes}m`;
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Redis Cache Monitor</h2>
				<Button onClick={fetchCacheStats} disabled={loading}>
					{loading ? "Refreshing..." : "Refresh"}
				</Button>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Cache Health</CardTitle>
					</CardHeader>
					<CardContent>
						{health ? (
							<div className="space-y-2">
								<div className="flex items-center space-x-2">
									<div
										className={`w-3 h-3 rounded-full ${
											health.healthy ? "bg-green-500" : "bg-red-500"
										}`}
									/>
									<span>{health.healthy ? "Healthy" : "Unhealthy"}</span>
								</div>
								<p className="text-sm text-gray-600">
									Last checked:{" "}
									{new Date(health.timestamp).toLocaleString("pt-BR")}
								</p>
							</div>
						) : (
							<p>Loading...</p>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Cache Statistics</CardTitle>
					</CardHeader>
					<CardContent>
						{stats ? (
							<div className="space-y-2">
								<p>
									<strong>Total Keys:</strong> {stats.totalKeys}
								</p>
								<p>
									<strong>Memory Usage:</strong> {stats.memoryUsage}B
								</p>
								<p>
									<strong>Uptime:</strong> {formatUptime(stats.uptime)}
								</p>
							</div>
						) : (
							<p>Loading...</p>
						)}
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Cache Management</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<p className="text-sm text-gray-600">
							Invalidate cache by tags to clear related cached data:
						</p>
						<div className="flex flex-wrap gap-2">
							<Button
								variant="outline"
								onClick={() => invalidateCache("users")}
							>
								Clear Users Cache
							</Button>
							<Button
								variant="outline"
								onClick={() => invalidateCache("*")}
								className="text-red-600 border-red-300 hover:bg-red-50"
							>
								Clear All Cache
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
