import { NextResponse } from "next/server";
import clientPromise from "../../../lib/db";

export async function POST(req) {
  try {
    const { email, toolName, prompt, response } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("aiAgent");
    const collection = db.collection("chatHistory");

    const chatDoc = {
      email,
      toolName,
      prompt,
      response,
      createdAt: new Date(),
    };

    await collection.insertOne(chatDoc);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error saving chat:", err);
    return NextResponse.json({ error: "Failed to save chat" }, { status: 500 });
  }
}
