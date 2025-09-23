import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "../../../../lib/db";
import { generateToken } from "../../../../lib/auth";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    console.log(name, email, password);

    if (!name || !email || !password) {
      return NextResponse.json({ msg: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("aiAgent");
    const users = db.collection("users");

    const existing = await users.findOne({ email });
    if (existing) {
      return NextResponse.json({ msg: "User already exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await users.insertOne({
      name,
      email,
      password: hashed,
      createdAt: new Date(),
    });

    const token = generateToken({ _id: result.insertedId, email });

    return NextResponse.json({ token }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
}
