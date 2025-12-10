import { NextResponse } from "next/server";
import { redis } from "../../../lib/redis"; // ← THIS IS IMPORTANT

export async function POST() {
  try {
    const count = await redis.incr("visits");
    return NextResponse.json({ count });
  } catch (err) {
    console.error("Counter error:", err);
    return NextResponse.json({ count: 0 });
  }
}
