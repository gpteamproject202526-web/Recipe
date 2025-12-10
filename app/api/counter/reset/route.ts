import { NextResponse } from "next/server";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!, {
  tls: { rejectUnauthorized: false }
});

// POST /api/counter/reset
export async function POST() {
  try {
    await redis.set("visits", 0);  // Reset to zero
    return NextResponse.json({ message: "Counter reset to 0" });
  } catch (error) {
    console.error("Redis reset error:", error);
    return NextResponse.json(
      { error: "Failed to reset counter" },
      { status: 500 }
    );
  }
}
