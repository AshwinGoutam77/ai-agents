import clientPromise from "../../../lib/db";
const MAX_DAILY_USAGE = 10;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, toolName } = req.body;

  if (!email) return res.status(401).json({ error: "Please login first!" });
  if (!toolName) return res.status(400).json({ error: "Tool name required" });

  const client = await clientPromise;
  const db = client.db("aiAgent");
  const collection = db.collection("users");

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
    return res.json({ allowed: true, usageCount: 1 });
  }

  if (record.usageCount >= MAX_DAILY_USAGE) {
    return res.status(403).json({ allowed: false, error: "Daily usage limit reached for this tool." });
  }

  // Increment usage
  await collection.updateOne(
    { email, toolName },
    { $inc: { usageCount: 1 }, $set: { lastUsed: new Date() } }
  );

  res.json({ allowed: true, usageCount: record.usageCount + 1 });
}
