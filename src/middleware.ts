// TODO: Implement the code here to add rate limiting with Redis
// Refer to the Next.js Docs: https://nextjs.org/docs/app/building-your-application/routing/middleware
// Refer to Redis docs on Rate Limiting: https://upstash.com/docs/redis/sdks/ratelimit-ts/algorithms

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Configure the rate limiter: 100 requests per 10 minutes per IP
const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(100, "10 m"),
  analytics: true,
});

export async function middleware(request: NextRequest) {
  try {
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || // If behind a proxy
      request.headers.get("cf-connecting-ip") || // If using Cloudflare
      request.headers.get("x-real-ip") || // Common header for real client IP
      "unknown";
  

    // Check the rate limit for the IP
    const { success, limit, remaining, reset } = await rateLimiter.limit(clientIp);

    if (!success) {
      return new NextResponse(
        JSON.stringify({
          error: "Rate limit exceeded. Please try again later.",
          limit,
          remaining,
          reset,
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Add rate limit headers to the response
    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit", limit.toString());
    response.headers.set("X-RateLimit-Remaining", remaining.toString());
    response.headers.set("X-RateLimit-Reset", reset.toString());

    return response;
  } catch (error) {
    console.error("Error in middleware rate limiting:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error. Please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    // Match all request paths except static files and images
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
