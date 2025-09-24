// app/api/use-tool-checker/route.js
import clientPromise from "../../../lib/db";

const MAX_DAILY_USAGE = 10;

export async function POST(req) {
  try {
    const { email, toolName } = await req.json();

    if (!email) return new Response(JSON.stringify({ error: "Please login first!" }), { status: 401 });
    if (!toolName) return new Response(JSON.stringify({ error: "Tool name required" }), { status: 400 });

    const client = await clientPromise;
    const db = client.db("aiAgent");
    const collection = db.collection("toolUsage");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const record = await collection.findOne({ email, toolName });

    if (!record || new Date(record.lastUsed) < today) {
      // Reset counter for new day
      await collection.updateOne(
        { email, toolName },
        { $set: { usageCount: 1, lastUsed: new Date() } },
        { upsert: true }
      );
      return new Response(JSON.stringify({ allowed: true, usageCount: 1 }), { status: 200 });
    }

    if (record.usageCount >= MAX_DAILY_USAGE) {
      return new Response(JSON.stringify({ allowed: false, error: "Daily usage limit reached for this tool." }), { status: 403 });
    }

    // Increment usage
    await collection.updateOne(
      { email, toolName },
      { $inc: { usageCount: 1 }, $set: { lastUsed: new Date() } }
    );

    return new Response(JSON.stringify({ allowed: true, usageCount: record.usageCount + 1 }), { status: 200 });

  } catch (err) {
    console.error("use-tool-checker error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
