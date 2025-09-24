import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import clientPromise from "../../../../lib/db";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const cookieHeader = req.headers.get("cookie");
    const tokenMatch = cookieHeader?.match(/auth_token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      return NextResponse.json({ msg: "Not authenticated" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    const client = await clientPromise;
    const db = client.db("aiAgent");
    const users = db.collection("users");

    const user = await users.findOne(
      { _id: new ObjectId(decoded.id) }, // FIXED
      { projection: { password: 0 } }
    );

    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: user.name }, { status: 200 });
  } catch (err) {
    console.error("Profile API error:", err);
    return NextResponse.json(
      { msg: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
