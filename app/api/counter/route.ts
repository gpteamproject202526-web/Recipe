import { NextResponse } from "next/server";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!, {
  tls: { rejectUnauthorized: false }
});

export async function POST() {
  try {
    const count = await redis.incr("visits");
    console.log("Visits incremented:", count);
    return NextResponse.json({ count });
  } catch (err) {
    console.error("Redis error:", err);
    return NextResponse.json(
      { error: "Failed to increment counter" },
      { status: 500 }
    );
  }
}

console.log("Counter API loaded");
