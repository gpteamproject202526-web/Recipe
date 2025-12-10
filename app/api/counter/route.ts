// app/api/counter/route.ts
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// Initialize Redis using environment variables
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST() {
  try {
    const count = await redis.incr("visits");
    console.log("Visits incremented:", count);
    return NextResponse.json({ count });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to increment counter" }, { status: 500 });
  }
}
