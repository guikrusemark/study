This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

- **Next.js 15** with App Router
- **MongoDB** integration with connection pooling
- **Redis** caching for improved performance
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Shadcn/ui** components
- **Form validation** with Zod and React Hook Form

## Environment Setup

Copy `.env.example` to `.env.local` and configure your environment variables:

```bash
cp .env.example .env.local
```

### Required Environment Variables

```env
# MongoDB Configuration
MONGODB_USERNAME=your_username
MONGODB_PASSWORD=your_password
MONGODB_DATABASE=your_database

# Redis Configuration (choose one option)
# Option 1: Redis URL (recommended)
REDIS_URL=redis://localhost:6379

# Option 2: Individual parameters
REDIS_HOST=localhost
REDIS_PORT=6379
```

## Development with Docker

Start MongoDB and Redis services:

```bash
docker-compose up -d
```

## Redis Caching

This application implements Redis caching for MongoDB queries with the following features:

### Cache Strategy
- **User list**: Cached for 5 minutes with `users` tag
- **Individual users**: Cached for 10 minutes with `users` and `user:{id}` tags
- **Automatic invalidation**: Cache is cleared when users are created, updated, or deleted

### Cache Management
- Visit `/cache` to monitor Redis health and statistics
- Manual cache invalidation by tags
- Cache performance metrics

### Cache Functions
```typescript
// Get with automatic fallback to database
const users = await getCachedWithFallback(
  "users:all",
  () => fetchUsersFromDB(),
  { ttl: 300, tags: ["users"] }
);

// Invalidate by tag
await invalidateByTag("users");
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
